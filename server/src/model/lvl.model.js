import mongoose from "mongoose";

const lvlSchema = new mongoose.Schema({
  Lvl_No: {
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
  //for lvl - 1 only values to 0
  Lvl_InitialScore:{
    type:String,
  },
  //represents the score that user will get if he corrects the answer
  Lvl_Score:{
    type: Number,
    required: true,
    unique: true
  }
});
export const Lvl = mongoose.model("Lvl", lvlSchema);
