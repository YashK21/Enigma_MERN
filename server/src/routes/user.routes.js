  import { Router } from "express";
  import {
    levelImg,
    levelAnsCheck,
    loginUser,
    logoutUser,
    registerUser,
    currentLvl,
  } from "../controllers/user.controller.js";
  import { verifyJWT } from "../middlewares/auth.middleware.js";
  const router = Router();
  router.route("/register").post(registerUser);
  // console.log("before login from user.rouye")
  router.route("/login").post(loginUser);
  router.route("/level/:lvl").get(verifyJWT, levelImg);
  router.route("/levelanscheck/:lvl").post(verifyJWT, levelAnsCheck);
  router.route("/currentlvl").get(verifyJWT, currentLvl);
  router.route("/logout").post(verifyJWT, logoutUser);

  export default router;
