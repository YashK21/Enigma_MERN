import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const adminSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  adminAccessToken :{
    type:String,
  }
});

adminSchema.methods.passCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.genAdminToken = function () {
  return jwt.sign(
    {
      _id:this._id,
      username: this.username,
    },
    process.env.ADMIN_TOKEN,
    {
      expiresIn: "1h",
    }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
