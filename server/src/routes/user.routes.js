import { Router } from "express";
import {
  getCurrentUserDetails,
  levelAnsCheck,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").post(verifyJWT, getCurrentUserDetails);
router.route("/levelanscheck/:lvl").post(verifyJWT, levelAnsCheck);
router.route("/leaderboard").get(levelAnsCheck);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
