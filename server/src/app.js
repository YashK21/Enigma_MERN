import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
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
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET, // Replace 'your-secret-key' with a secret string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
 }));
// app.use(express.urlencoded({ extend: true, limit: "16kb" }));

import router from "./routes/user.routes.js";
app.use("/api/v1/", router);
export default app;
