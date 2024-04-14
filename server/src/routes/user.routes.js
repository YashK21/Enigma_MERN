import { Router } from "express";
import {
  level,
  levelAnsCheck,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import admin from "../admin/admin.controller.js";
import adminLogin from "../admin/admin.login.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/level/:lvl").get(verifyJWT,level);
router.route("/levelanscheck/:lvl").post(verifyJWT,levelAnsCheck);
router.route("/logout").post(verifyJWT, logoutUser);
//admin route
router.route("/admin/login").post(adminLogin)
router.route("/admin").post(admin);

export default router;
