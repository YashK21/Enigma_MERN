import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
import mongoose from "mongoose";

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
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

//reg
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  if (
    [email, username, password].some((emptyField) => emptyField.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  //check for existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) throw new ApiError(400, "User Already Exists");

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
  if (!userSaved)
    throw new ApiError(500, "Something went wrong while registration");

  return res.status(201).json(new ApiRes(200, userSaved, "User Registered"));
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username) throw new ApiError(400, "username is required");

  const existedUser = await User.findOne({
    $or: [
      {
        username,
      },
    ],
  });
  if (!existedUser) throw new ApiError(404, "User not found");
  const passwordValid = await existedUser.passCheck(password);
  if (!passwordValid) throw new ApiError(401, "Password is wrong!!");
  const { accessToken, refreshToken } = await genAccessTokenandRefreshToken(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return;
  res
  .status(200)
  .cookie("accessToken", accessToken,options)
  .cookie("refreshToken", refreshToken,options)
  .json(
    new ApiRes(200,{
        user : existedUser,
        accessToken,
        refreshToken
    }),
    "User logged in successfully"
  )
};
export { registerUser ,loginUser};
