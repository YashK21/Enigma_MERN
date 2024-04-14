import { Lvl } from "../model/lvl.model.js";
import ApiRes from "../utils/ApiRes.js";
import ApiError from "../utils/ApiRes.js";

const admin = async (req, res) => {

  //for uploading Lvls
  let { Lvl_No, Lvl_Ans } = req.body;
  const file = req.files.Lvl_Img;
  // console.log(file);
  if (!file) {
    return res.status(400).json(new ApiError(400, "No file uploaded"));
  }
  const base64Img = Buffer.from(file.data).toString("base64");
  if (
    [Lvl_No, base64Img, Lvl_Ans].some(
      (emptyField) => String(emptyField).trim() === ""
    )
  ) {
    return res.status(400).json(new ApiError(400, "All Fields are required"));
  }
  const lvlExisted = await Lvl.findOne({
    $or: [{ Lvl_No }, { Lvl_Img: base64Img }, { Lvl_Ans }],
  });
  if (lvlExisted) {
    return res.status(400).json(new ApiError(400, "Level Already Exists"));
  }
  const levelCreated = await Lvl.create({
    Lvl_No,
    Lvl_Img: base64Img,
    Lvl_Ans 
  });

  const levelSaved = await Lvl.findOne(levelCreated._id).select("-Lvl_Ans");
  if (!levelSaved) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while adding level"));
  }
  return res
    .status(200)
    .json(new ApiRes(200, Lvl_No, `Level No: ${Lvl_No} Added Successfully`));
};
export default admin;
