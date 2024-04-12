import mongoose from "mongoose";

const lvlSchema = new mongoose.Schema({
  Lvl_no: {
    type: String,
    required: true,
    unique: true,
  },
  Lvl_Img: {
    type: String,
    required: true,
    unique: true,
  },
  Lvl_Ans: {
    type: String,
    required: true,
    unique: true,
  },
});
export const Lvl = mongoose.model("Lvl", lvlSchema);
