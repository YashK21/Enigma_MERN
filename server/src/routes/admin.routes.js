import { Router } from "express";
import adminUpload from "../admin/admin.lvl.upload.js";
import { adminLogin } from "../admin/admin.controller.js";
import { adminLogout } from "../admin/admin.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
const adminRouter = Router();
adminRouter.route("/admin/login").post(adminLogin);
adminRouter.route("/admin").post(verifyAdminJWT,adminUpload);
adminRouter.route("/admin/logout").post(verifyAdminJWT, adminLogout);

export default adminRouter;
