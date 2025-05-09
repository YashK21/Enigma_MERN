import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config(
  {
    path:"./.env"
  }
)
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    currentLvl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lvl",
    },
    userCurrentScore: {
      type: Number,
    },
    lastCompletedLvls: [
      {
        levelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lvl",
        },
        levelValue: Number,
      },
    ],
    userRefreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.passCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.genAccessToken = function () {
  // console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET); // Debug log
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is missing in .env file");
  }
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.genRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "10d",
    }
  );
};
// here we didn't use arrow fun because it doesn't have ref to this
// means it doesn't know the context to which we are ref directly
export const User = mongoose.model("User", userSchema);
