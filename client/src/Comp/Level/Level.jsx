import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Level = () => {
  const [lvlImg, setLvlImg] = useState();
  const navigate = useNavigate();
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Level;
