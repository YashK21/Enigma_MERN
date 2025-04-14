import { Admin } from "../model/admin.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
const genAdminAccessToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const adminAccessToken = await admin.genAdminToken();
    admin.adminAccessToken = adminAccessToken;
    await admin.save();
    return { adminAccessToken };
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while generating tokens", error)
      );
  }
};
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password);
    
    if (!username) {
      return res.status(400).json(new ApiError(400, "username is required"));
    }
    if (!password) {
      return res.status(400).json(new ApiError(400, "password is required"));
    }

    const admin = await Admin.findOne({
      username,
    });
    if (!admin) {
      return res.status(400).json(new ApiError(404, "Admin not found"));
    }
    const passwordValid = await admin.passCheck(password);
    if (!passwordValid) {
      return res.status(401).json(new ApiError(404, "Password is wrong!!"));
    }

    const { adminAccessToken } = await genAdminAccessToken(admin._id);
    const loggedInAdmin = await Admin.findById(admin._id).select(
      "-password -adminAccessToken"
    );
    return (
      res
        .status(200)
        .cookie("adminAccessToken", adminAccessToken)
        // add when checking locally with postman - it behaves the same for auth like we have in client side
        .json(
          new ApiRes(
            200,
            {
              admin: loggedInAdmin,
              adminAccessToken,
            },
            "Admin logged in successfully"
          )
        )
    );
  } catch (error) {
    console.log(error);
  }
};
const adminLogout = async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        adminAccessToken: 1,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("adminAccessToken")
    .clearCookie("connect.sid")
    .json(new ApiRes(200, {}, "Admin LoggedOut SuccessFully!"));
};
export { adminLogin, adminLogout };
