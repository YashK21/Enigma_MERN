import { Lvl } from "../model/lvl.model.js";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
const genAccessTokenandRefreshToken = async (userId) => {
  try {
    const existedUser = await User.findById(userId);
    const accessToken = existedUser.genAccessToken();
    const refreshToken = existedUser.genRefreshToken();

    existedUser.refreshToken = refreshToken;
    await existedUser.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
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

  //create
  const createdUser = await User.create({
    email,
    username: username.toLowerCase(),
    password,
  });

  //check for saved
  const userSaved = await User.findById(createdUser._id).select(
    "-password -refreshtoken"
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
  if (!username) {
    // throw new ApiError(400, "username is required");
    return res.status(400).json(new ApiError(400, "username is required"));
  }
  if (!password) {
    return res.status(400).json(new ApiError(400, "password is required"));
  }
  const existedUser = await User.findOne({
    $or: [
      {
        username,
      },
    ],
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

  const { accessToken, refreshToken } = await genAccessTokenandRefreshToken(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    // httpOnly: true,
    httpOnly: false,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiRes(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
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
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .clearCookie("connect.sid", options)
    .json(new ApiRes(200, {}, "User LoggedOut SuccessFully!"));
};

//level
const level = async (req, res) => {
  let lvlNo = req.params.lvl;
  req.session.lvlNo = lvlNo;
  console.log(req.session.lvlNo, "from session");
  console.log(`Querying for "Level No": ${lvlNo}`);
  try {
    let lvlImg = await Lvl.findOne({ Lvl_No: lvlNo });
    console.log(`Query result:`, lvlImg);
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
      message: "Internal server error",
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
    if (!data) return res.status(200).json(new ApiError(200, "Wrong Answer!"));
    else {
      lvlNo = Number(lvlNo);
      lvlNo = lvlNo + 1;
      return res.status(200).json(new ApiRes(200, lvlNo, "Correct Answer"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error while submission!"));
  }
  // return res.send("Yes!")
};

export { registerUser, loginUser, logoutUser, level, levelAnsCheck };
