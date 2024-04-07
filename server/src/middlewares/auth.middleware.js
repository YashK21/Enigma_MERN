import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";

const verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized Request");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const currentUser = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!currentUser) throw new ApiError(401, "Invalid Access Token");
    req.user = currentUser;
    console.log(req.user);
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
};

export default verifyJWT;
