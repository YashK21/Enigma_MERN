import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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
// app.use(express.urlencoded({ extend: true, limit: "16kb" }));

import router from "./routes/user.routes.js";
app.use("/api/v1/", router);
export default app;
