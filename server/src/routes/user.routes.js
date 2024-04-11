import { Router } from "express";
import {
  level,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/level/:lvl").get(level);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
