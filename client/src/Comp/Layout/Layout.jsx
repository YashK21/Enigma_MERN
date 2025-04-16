import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

import envConfig from "../../config/env.config";
const Layout = () => {
  const [userDetails, setUserDetails] = useState({
    Lvl_No: "",
    Lvl_Img: "",
    Lvl_Score: "",
  });
  const [isChecking, setIsChecking] = useState(false);
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleUserLevelDetails = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await axios.post(
        `${envConfig.API_BASE_URL}/current-user`,
        {
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { Lvl_Img, Lvl_Score, Lvl_No } = await res.data.data;
      setUserDetails({
        Lvl_No,
        Lvl_Img,
        Lvl_Score,
      });
      setIsChecking(false);
    } catch (error) {
      console.log(error);
      setIsChecking(false);
    }
  }, [username]);
  useEffect(() => {
    const excludedPaths = [
      "/",
      "/login",
      "/signup",
      "/admin",
      "/rules",
      "/noauth",
      "/contact",
      "/leaderboard",
      "/admin/level",
      "/admin/login",
    ];
    if (excludedPaths.includes(location.pathname)) return;
    handleUserLevelDetails();
  }, [handleUserLevelDetails, location.pathname]);
  if (isChecking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-green-400 text-xl font-pressStart animate-pulse">
        Enigma is decrypting your fate...
      </div>
    );
  }
  return (
    <>
      {<NavBar />}
      <Outlet context={{ userDetails, isChecking }} />
    </>
  );
};

export default Layout;
