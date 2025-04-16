import cookieOptions from "../config/cookiesOptions.js";
import { Lvl } from "../model/lvl.model.js";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
const genAccessTokenandRefreshToken = async (userId) => {
  try {
    const existedUser = await User.findById(userId);
    console.log("User Found:", existedUser);

    const userAccessToken = existedUser.genAccessToken();
    console.log("Generated Access Token:", userAccessToken); // Debug log

    const userRefreshToken = existedUser.genRefreshToken();
    existedUser.userRefreshToken = userRefreshToken;

    await existedUser.save({ validateBeforeSave: false });

    return { userAccessToken, userRefreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating tokens",
      error
    );
  }
};

//reg
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    [email, username, password].some((emptyField) => emptyField.trim() === "")
  ) {
    return res.status(400).json(new ApiError(400, "All Fields are required"));
  }

  //check for existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    return res.status(400).json(new ApiError(400, "User Already Exists"));
  }

  //currentLvl
  const currentLvl = await Lvl.findOne({ Lvl_No: "1" });
  const createdUser = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    currentLvl: currentLvl._id,
    userCurrentScore: 0,
    lastcompletedLvl: null,
  });

  //check for saved
  const userSaved = await User.findById(createdUser._id).select(
    "-password -userRefreshToken"
  );
  if (!userSaved) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registration"));
  }
  return res.status(200).json(new ApiRes(200, userSaved, "User Registered"));
};

//login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "username  and password is required"));
  }

  const existedUser = await User.findOne({
    username,
  });
  if (!existedUser) {
    return res.status(400).json(new ApiError(404, "User not found"));
  }
  const passwordValid = await existedUser.passCheck(password);
  if (!passwordValid) {
    return res.status(401).json(new ApiError(404, "Password is wrong!!"));
  }

  if (!username.currentLvl) {
    let currentLvl = await Lvl.findOne({ Lvl_No: "1" });
    if (currentLvl == 1) {
    }
    currentLvl = currentLvl._id;
  }

  console.log(existedUser);

  const { userAccessToken } = await genAccessTokenandRefreshToken(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select("-password");
  return res
    .status(200)
    .cookie("userAccessToken", userAccessToken, cookieOptions)
    .json(
      new ApiRes(
        200,
        {
          user: loggedInUser,
        },
        "User logged in successfully"
      )
    );
};

//logout
const logoutUser = async (req, res) => {
  const { username } = req.body;
  try {
    if (username) {
      await User.findOneAndUpdate(
        { username },
        {
          $set: {
            userRefreshToken: 1,
          },
        },
        {
          new: true,
        }
      );
      return res
        .clearCookie("userAccessToken",cookieOptions)
        .status(200)
        .json(new ApiRes(200, {}, "User LoggedOut SuccessFully!"));
    } else {
      return res
        .status(404)
        .json(new ApiError(404, "User not loggedout! - Failed"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

const getUserLevelDetails = async (req, res) => {
  const { username } = req.body;
  console.log(username);

  try {
    const currentUserName = await User.findOne({
      username,
    });

    const currentLvl = currentUserName?.currentLvl;
    const currentLvlDetails = await Lvl.findById({
      _id: currentLvl,
    });

    if (!currentLvlDetails) {
      return res
        .status(404)
        .json(new ApiError(404, `Lvl not found for id: ${Lvl_No}`));
    }
    const { Lvl_No, Lvl_Img, Lvl_Score } = currentLvlDetails;
    return res.status(200).json(
      new ApiRes(200, `currentLvlDetails fetched successfully!`, {
        Lvl_No,
        Lvl_Img,
        Lvl_Score,
      })
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

//level Ans Check and Update Score
const levelAnsCheck = async (req, res) => {
  const { username, userInputAnswer, currentLvl } = req.body;
  try {
    const currentLvlDetails = await Lvl.findOne({ Lvl_No: currentLvl });

    if (
      currentLvlDetails?.Lvl_Ans !== userInputAnswer ||
      !userInputAnswer ||
      userInputAnswer?.trim() === ""
    ) {
      return res.status(400).json(new ApiError(400, "Wrong Answer!"));
    }

    const userNextLvl = await Lvl.findOne({
      Lvl_No: Number(currentLvlDetails?.Lvl_No) + 1,
    });

    const updatedUserDetails = await User.findOneAndUpdate(
      {
        username,
        "lastCompletedLvls.levelValue": { $ne: currentLvlDetails?.Lvl_No },
      },
      {
        $set: {
          currentLvl: userNextLvl?._id,
        },
        $push: {
          lastCompletedLvls: {
            levelId: currentLvlDetails?._id,
            levelValue: currentLvlDetails?.Lvl_No,
          },
        },
        $inc: {
          userCurrentScore: Number(currentLvlDetails?.Lvl_Score) || 0,
        },
      },
      { new: true }
    ).select("-createdAt -password -userRefreshToken -__v -_id");

    return res
      .status(200)
      .json(
        new ApiRes(
          200,
          `Correct Answr for Lvl - ${currentLvlDetails?.Lvl_No}`,
          updatedUserDetails
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error while submission!"));
  }
};

//for leaderboard
const getAllUserScore = async (_, res) => {
  try {
    const userScores = await User.find({})
      .sort({ userCurrentScore: -1 })
      .select("username userCurrentScore -_id");
    console.log(userScores);

    return res.status(200).json(new ApiRes(200, "Users Score", userScores));
  } catch (error) {
    console.log(error);
  }
};

const autheticateUser = async (req, res) => {
  return res.status(200).json(
    new ApiRes(200, "Authenticated User ", {
      autheticated: true,
      user: req.user,
    })
  );
};
export {
  registerUser,
  loginUser,
  logoutUser,
  getUserLevelDetails as getCurrentUserDetails,
  levelAnsCheck,
  autheticateUser,
  getAllUserScore,
};
