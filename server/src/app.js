import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import router from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config({
  path: "./.env",
});
const app = express();
app.use(cookieParser());
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin.trim())) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

app.use("/api/v1/", router, adminRouter);
export default app;
