import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Level = () => {
  const [lvlImg, setLvlImg] = useState();
  const [lvlAns , setLvlAns] = useState("")
  const navigate = useNavigate();
  const { lvl } = useParams();
  const handleLvlImg = async () => {
    try {
      let res = await fetch(`http://localhost:8000/api/v1/level/${lvl}`, {
        credentials: "include",
      },
  );
      res = await res.json();
      const imgData = await res.message;
      setLvlImg(imgData);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
 
  const handleLevelAnsCheck = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch(`http://localhost:8000/api/v1/levelanscheck/${lvl}`,{
        method:"POST", 
        body: JSON.stringify({ ans: lvlAns }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
      })
      res = await res.json()
      setLvlAns("")
      console.log(res , "from ans check!")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleLvlImg();
  }, [lvlImg]);
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure gracefully
    }
  };
  return (
    <div>
      Level
      <br />
      <h2>Username : {localStorage.getItem("username")}</h2>
      <img src={lvlImg} alt="lvl 1" />
      <br />
      <div class="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Enter text here"
          value={lvlAns}
          onChange={(e) => setLvlAns(e.target.value)}
          class="border-2 border-gray-300 m-4 rounded-md p-2 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        <button
          type="submit"
          onClick={handleLevelAnsCheck}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
          Submit
        </button>
        <br />
          </div> 
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Level;
