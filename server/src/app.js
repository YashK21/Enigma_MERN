import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/user.routes.js";

const app = express();
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

app.use(cookieParser());

app.use("/api/v1/",router)
export default app;
