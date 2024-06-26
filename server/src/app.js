import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
dotenv.config({
  path: "./.env",
});
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
);
let sessionValue = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: false },
};
app.use(session(sessionValue));
app.use(fileUpload());

import router from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
app.use("/api/v1/", router);
app.use("/", adminRouter);
export default app;
