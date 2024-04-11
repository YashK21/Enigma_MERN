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
    .json(new ApiRes(200, {}, "User LoggedOut SuccessFully!"));
};

//level

// const level = async (req, res) => {
//   const lvlNo = req.params.id;
//   console.log(lvlNo);
//   const lvlImg = await Lvl.findOne({ 1: lvlNo });
//   console.log(lvlNo);
//   // console.log(lvlImg);
//   return res.status(200).json(new ApiRes(200, { lvlImg }), `Lvl No: ${lvlNo}`);
// };

const level = async (req, res) => {
  const lvlNo = req.params.lvl;
  // const lvlNo = 1;
  console.log(`Querying for "1": ${lvlNo}`);

  try {
    let lvlImg = await Lvl.findOne({ Lvl_no: lvlNo });
    console.log(`Query result:`, lvlImg);
   lvlImg = (lvlImg.Lvl_Img);

    if (!lvlImg) {
      return res.status(404).json({
        statusCode: 404,
        data: `Lvl not found for id: ${lvlNo}`,
        message: null,
        success: true,
      });
    }
     return res
       .status(200)
       .json({ statusCode: 200, data: { lvlImg }, message: `Lvl No: ${lvlNo}`, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Internal server error",
      success: true,
    });
  }
};

// const level = async (req, res) => {
//   const lvlNo = "Level 1"; // This is the value you're querying for in the "1" field
//   console.log(`Querying for "1": ${lvlNo}`);

//   try {
//      // Use findOne() to find the document by the "1" field and project only the "1" field
//      const lvlImg = await Lvl.findOne({ "1": lvlNo });
//      console.log(`Query result:`, lvlImg);

//      if (!lvlImg) {
//        return res
//          .status(404)
//          .json({ statusCode: 404, data: `Lvl not found for id: ${lvlNo}`, message: null, success: true });
//      }
//      // Extract the value of the "1" field from the document
//      const lvlValue = lvlImg["1"];

//      // Return the value of the "1" field as the response
//      return res
//        .status(200)
//        .json({ statusCode: 200, data: lvlValue, message: `Lvl No: ${lvlNo}`, success: true });
//   } catch (error) {
//      console.error(error);
//      return res.status(500).json({ statusCode: 500, data: null, message: "Internal server error", success: true });
//   }
//  };

export { registerUser, loginUser, logoutUser, level };
