import { Router } from "express";
import admin from "../admin/admin.controller.js";
import { adminLogin } from "../admin/admin.login.js";
import { adminLogout } from "../admin/admin.login.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
const adminRouter = Router();
adminRouter.route("/admin/login").post(adminLogin);
adminRouter.route("/admin").post(admin);
adminRouter.route("/admin/logout").post(verifyAdminJWT, adminLogout);

export default adminRouter;
