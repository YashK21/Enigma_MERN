import mongoose from "mongoose";
import { Lvl } from "../model/lvl.model.js";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
const genAccessTokenandRefreshToken = async (userId) => {
  try {
    const existedUser = await User.findById(userId);
    const userAccessToken = existedUser.genAccessToken();
    const userRefreshToken = existedUser.genRefreshToken();

    existedUser.userRefreshToken = userRefreshToken;
    await existedUser.save({
      validateBeforeSave: false,
    });
    return { userAccessToken, userRefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens",
      error
    );
  }
};
const getNextLvlObjectId = async (currentLvlNo) => {
  const nextLvl = await Lvl.findOne({ Lvl_No: currentLvlNo + 1 });
  return nextLvl._id;
};
//reg
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    [email, username, password].some((emptyField) => emptyField.trim() === "")
  ) {
    // throw new ApiError(400, "All Fields are required");
    return res.status(400).json(new ApiError(400, "All Fields are required"));
  }

  //check for existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    // throw new ApiError(400, "User Already Exists")
    return res.status(400).json(new ApiError(400, "User Already Exists"));
  }

  //currentLvl
  const currentLvl = await Lvl.findOne({ Lvl_No: "1" });
  const intialScore = await Lvl.findOne({ Lvl_InitialScore: "0" });
  const createdUser = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    currentLvl: currentLvl._id,
    userCurrentScore: intialScore.Lvl_InitialScore,
  });

  //check for saved
  const userSaved = await User.findById(createdUser._id).select(
    "-password -userRefreshToken"
  );
  if (!userSaved) {
    // throw new ApiError(500, "Something went wrong while registration");
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registration"));
  }
  return res.status(201).json(new ApiRes(200, userSaved, "User Registered"));
};

//login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // throw new ApiError(400, "username is required");
    return res
      .status(400)
      .json(new ApiError(400, "username  and password is required"));
  }

  const existedUser = await User.findOne({
    username,
  });
  if (!existedUser) {
    // throw new ApiError(404, "User not found");
    return res.status(400).json(new ApiError(404, "User not found"));
  }
  const passwordValid = await existedUser.passCheck(password);
  if (!passwordValid) {
    // throw new ApiError(401, "Password is wrong!!");
    return res.status(401).json(new ApiError(404, "Password is wrong!!"));
  }

  if (!username.currentLvl) {
    let currentLvl = await Lvl.findOne({ Lvl_No: "1" });
    if (currentLvl == 1) {
    }
    currentLvl = currentLvl._id;
  }

  console.log("from 101", existedUser);
  // if(!username.)
  // let currentLvlScore = await Lvl.findOne({ Lvl_InitialScore: "0" });
  // console.log(currentLvlScore.Lvl_InitialScore);
  // currentLvlScore = currentLvlScore._id;
  // console.log(currentLvlScore);

  const { userAccessToken, userRefreshToken } =
    await genAccessTokenandRefreshToken(existedUser._id);

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -userRefreshToken"
  );
  return res
    .status(200)
    .cookie("userAccessToken", userAccessToken) // add when checking locally with postman - it behaves the same for auth like we have in client side
    .json(
      new ApiRes(
        200,
        {
          user: loggedInUser,
          userAccessToken,
          userRefreshToken,
          // currentLvlScore,
        },
        "User logged in successfully"
      )
    );
};

//logout
const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        userRefreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiRes(200, {}, "User LoggedOut SuccessFully!"));
};

// retriving the lvl_img frm db
const levelImg = async (req, res) => {
  let lvlNo = req.params.lvl;
  req.session.lvlNo = lvlNo;
  try {
    let lvlImg = await Lvl.findOne({ Lvl_No: lvlNo });
    lvlImg = lvlImg.Lvl_Img;
    if (!lvlImg) {
      return res
        .status(404)
        .json(new ApiError(404, `Lvl not found for id: ${lvlNo}`));
    }
    return res.status(200).json(new ApiRes(200, lvlImg, `Lvl No: ${lvlNo}`));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Internal server error from lvlImg",
      success: false,
    });
  }
};

//level Ans Check
const levelAnsCheck = async (req, res) => {
  const { ans } = req.body;
  // console.log(ans)
  let lvlNo = req.params.lvl;
  try {
    let data = await Lvl.findOne({ Lvl_Ans: ans.toLowerCase() });
    let Lvl_Score = data.Lvl_Score; //getting the score of lvl given by admin
    if (!data) return res.status(200).json(new ApiError(200, "Wrong Answer!"));
    else {
      lvlNo = Number(lvlNo);
      const nextLvlObjectId = await getNextLvlObjectId(lvlNo);
      lvlNo = lvlNo + 1;
      let user = await User.findOne(req.user._id);
      let userCurrentLvl = user.currentLvl;
      if (userCurrentLvl.toString() !== nextLvlObjectId.toString()) {
        // If the user has moved to a new level, update their score
        let userCurrentScore = user.userCurrentScore;
        if (Lvl_Score > userCurrentScore) {
          let currentScore = user.userCurrentScore;
          let score = data.Lvl_Score;
          currentScore = currentScore + score;
          await User.findByIdAndUpdate(req.user._id, {
            userCurrentScore: currentScore,
          });
        }
        // Update the user's current level to the next level
        await User.findByIdAndUpdate(req.user._id, {
          currentLvl: nextLvlObjectId,
        });
      }
      return res.status(200).json(new ApiRes(200, lvlNo, "Correct Answer"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error while submission!"));
  }
  // return res.send("Yes!")
};

//currentLvl
const currentLvl = async (req, res) => {
  const lvl = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "lvls", //frm lvls in db
        localField: "currentLvl",
        foreignField: "_id",
        as: "currentLvl",
      },
    },
    {
      $unwind: "$currentLvl",
    },
    {
      $project: {
        _id: 0,
        currentLvl: "$currentLvl",
      },
    },
  ]);
  if (lvl.length > 0) {
    return res
      .status(200)
      .json(new ApiRes(200, lvl[0].currentLvl, "Current levl of User"));
  } else {
    return res
      .status(404)
      .json(new ApiError(404, "User not found or no current level set"));
  }
};

const addScoreOfUser = async (req, res) => {
  let lvlNo = req.params.lvl;
  try {
    const user = await User.findById(req.user._id);
    console.log(user.userCurrentScore);
    res.send(lvlNo);
    // const currentLvl = await Lvl.findOne({ Lvl_No: lvlNo });
    // const currentLvlScore = currentLvl.Lvl_Score;
    // res.send(currentLvlScore);
  } catch (error) {
    res.send(error);
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  levelImg,
  levelAnsCheck,
  currentLvl,
  addScoreOfUser,
};
