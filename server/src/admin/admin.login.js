import { Admin } from "../model/admin.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
const genAdminAccessToken = async (adminId) => {
  try {
    
  } catch (error) {
    
  }
} 
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    // throw new ApiError(400, "username is required");
    return res.status(400).json(new ApiError(400, "username is required"));
  }
  if (!password) {
    return res.status(400).json(new ApiError(400, "password is required"));
  }

  const admin = await Admin.findOne({
    username,
  });
  if (!admin) {
    // throw new ApiError(404, "User not found");
    return res.status(400).json(new ApiError(404, "Admin not found"));
  }
  const passwordValid = await admin.passCheck(password);
  if (!passwordValid) {
    // throw new ApiError(401, "Password is wrong!!");
    return res.status(401).json(new ApiError(404, "Password is wrong!!"));
  }

  const {adminAccessToken} = await Admin.genAdminAccessToken()
  const loggedInAdmin = await Admin.findById(admin._id).select("-password");
  return res.status(200).json(
    new ApiRes(
      200,
      {
        admin: loggedInAdmin,
      },
      "Admin logged in successfully"
    )
  );
};

export default adminLogin;
