import mongoose from "mongoose";

const lvlSchema = new mongoose.Schema({
    one :{
        type :"String"
    }
})
export const Lvl = mongoose.model("Lvl",lvlSchema)