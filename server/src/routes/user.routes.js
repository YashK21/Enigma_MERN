import { Router } from "express";
import {
  getAllUserScore,
  getCurrentUserDetails,
  levelAnsCheck,
  loginUser,
  logoutUser,
  autheticateUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").post(verifyJWT, getCurrentUserDetails);
router.route("/levelanscheck/:lvl").post(verifyJWT, levelAnsCheck);
router.route("/verify-jwt").get(verifyJWT, autheticateUser);
router.route("/leaderboard").get(getAllUserScore);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
