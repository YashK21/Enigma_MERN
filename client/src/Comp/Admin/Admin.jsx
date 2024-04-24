import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Admin = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  const [LvlNo, setLvlNo] = useState("");
  const [LvlImg, setLvlImg] = useState(null);
  const [LvlAns, setLvlAns] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const adminAccessToken = Cookies.get("adminAccessToken");
  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Lvl_No", LvlNo);
      formData.append("Lvl_Img", LvlImg);
      formData.append("Lvl_Ans", LvlAns);
      await axios
        .post(`${prodUrl}/admin`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminAccessToken}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (!res.data.success) alert("Something Went Wrong while Uploading");
          else if (res.data.success) {
            alert("Upload Successfull");
            if (formRef.current) {
              formRef.current.reset();
            }
            setLvlNo("");
            setLvlImg(null);
            setLvlAns("");
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // let res = await fetch(`${localhost}/admin`, {
      //   method: "POST",
      //   body: formData,
      //   credentials: "include",
      // });
      // res = await res.json();
      // if (!res.success) alert("Something Went Wrong while Uploading");
      // else if (res) {
      //   alert("Upload Successfull");
      //   if (formRef.current) {
      //     formRef.current.reset();
      //   }
      //   // Reset the state for each field
      //   setLvlNo("");
      //   setLvlImg(null);
      //   setLvlAns("");
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    await axios
      .post(
        `${prodUrl}/admin/logout`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminAccessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        Cookies.remove("connect.sid");
        Cookies.remove("adminAccessToken");
        localStorage.removeItem("admin");
        navigate("/admin/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  return (
    <>
      <form ref={formRef} className="max-w-md mx-auto mt-8">
        <div>
          <label
            htmlFor="lvlNo"
            className="block mb-2 font-medium text-gray-700"
          >
            Level Number
          </label>
          <input
            type="text"
            id="lvlNo"
            name="lvlNo"
            value={LvlNo}
            onChange={(e) => setLvlNo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter level number"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="img" className="block mb-2 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setLvlImg(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="lvlAns"
            className="block mb-2 font-medium text-gray-700"
          >
            Level Answer
          </label>
          <input
            type="text"
            id="lvlAns"
            name="lvlAns"
            value={LvlAns}
            onChange={(e) => setLvlAns(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter level answer"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmission}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <br />
      <button
        className="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Admin;
