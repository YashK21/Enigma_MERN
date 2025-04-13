import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Cookies from "js-cookie";
const Layout = () => {
  const [userDetails, setUserDetails] = useState({
    Lvl_No: "",
    Lvl_Img: "",
    Lvl_Score: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const userAccessToken = Cookies.get("userAccessToken");
  const localhost = import.meta.env.VITE_LOCALHOST;
  // const prodUrl = import.meta.env.VITE_PROD;
  const handleUserLevelDetails = useCallback(async () => {
    try {
      const res = await axios.post(
        `${localhost}/current-user`,
        {
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAccessToken}`,
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
      navigate(`/level/${Lvl_No}`);
    } catch (error) {
      console.log(error);
    }
  }, [username, localhost, userAccessToken,navigate]);
  useEffect(() => {
    const excludedPaths = ["/", "/login", "/signup"];
    if (excludedPaths.includes(location.pathname)) return;
    handleUserLevelDetails();
  }, [handleUserLevelDetails, location.pathname]);
  return (
    <>
      {username ? <NavBar /> : null}
      <Outlet context={userDetails} />
    </>
  );
};

export default Layout;
