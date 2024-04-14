import { Router } from "express";
import admin from "../admin/admin.controller.js";
import adminLogin from "../admin/admin.login.js";
const adminRouter = Router();
adminRouter.route("/admin/login").post(adminLogin);
adminRouter.route("/admin").post(admin);

export default adminRouter;
