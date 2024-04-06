import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB}/${DB_NAME}`);
    console.log(`DB Connected at host :${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error! while connecting to DB", error);
    process.exit(1);
  }
};
export default connDB;
