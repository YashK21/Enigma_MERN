import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import { Admin } from "../model/admin.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.userAccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      // throw new ApiError(401, "Unauthorized Request")
      return res.status(401).json(new ApiError(401, "Unauthorized Request"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const currentUser = await User.findById(decodedToken?._id).select(
      "-password -userRefreshToken"
    );
    if (!currentUser) {
      // throw new ApiError(401, "Invalid User Access Token");
      return res
        .status(401)
        .json(new ApiError(401, "Invalid User Access Token"));
    }
    req.user = currentUser;
    // console.log(req.user);
    next();
  } catch (error) {
    // throw new ApiError(401, error?.message || "Invalid User Access Token");
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid User Access Token"));
  }
};

const verifyAdminJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.adminAccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token)
    if (!token) throw new ApiError(401, "Unauthorized Request");
    const decodedToken = jwt.verify(token, process.env.ADMIN_TOKEN);
    const currentAdmin = await Admin.findById(decodedToken?._id).select(
      "-password -adminAccessToken"
    );
    // console.log(currentAdmin)
    // console.log(decodedToken);
    if (!currentAdmin) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid Admin Access Token"));
    }
    req.admin = currentAdmin;
    // console.log(req.admin)
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid Admin Access Token"));
    // throw new ApiError(401, error?.message || "Invalid Access Token");
  }
};
export { verifyJWT, verifyAdminJWT };
