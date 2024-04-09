import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Level = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {

     try {
      await fetch("http://localhost:8000/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Level;
