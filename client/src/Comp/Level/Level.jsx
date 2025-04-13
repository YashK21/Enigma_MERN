import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lvl_Bg from "../img/lvl_Bg.jpg";
const Level = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  // const prodUrl = import.meta.env.VITE_PROD;
  const [currentLvlDetails, setCurrentLvlDetails] = useState({
    Lvl_No: "",
    Lvl_Img: "",
    Lvl_Score: "",
  });
  const [userInputAnswer, setUserInputAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userAccessToken = Cookies.get("userAccessToken");
  const username = localStorage.getItem("username");
  const handleUserDetails = useCallback(async () => {
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
      const { Lvl_No, Lvl_Img, Lvl_Score } = res.data.data;
      setCurrentLvlDetails({
        Lvl_No,
        Lvl_Img,
        Lvl_Score,
      });
    } catch (error) {
      console.log(error?.response?.data?.errorMessage);
    }
  }, [username, localhost, userAccessToken]);
  const handleLevelAnsCheck = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${localhost}/levelanscheck/${currentLvlDetails?.Lvl_No}`,
        {
          username,
          userInputAnswer,
          currentLvl: currentLvlDetails?.Lvl_No,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAccessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error?.response?.data?.errorMessage);
    } finally {
      setTimeout(() => setIsLoading(false), 500);    }
  };
  useEffect(() => {
    handleUserDetails();
  }, [handleUserDetails]);

  const handleLogout = async () => {
    console.log("handle logout ");
    try {
      await fetch(`${localhost}/logout`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      });
      Cookies.remove("userAccessToken");
      Cookies.remove("connect.sid");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="h-screen overflow-y-auto flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${lvl_Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Source Code Pro, monospace",
          fontWeight: 600,
          fontStyle: "normal",
          letterSpacing: "0.5px",
        }}
      >
        <h1 className="text-2xl  font-extrabold lg:mt-16 mb-3 text-white drop-shadow-md">
          Level {currentLvlDetails.Lvl_No} - Points{" "}
          {currentLvlDetails.Lvl_Score}
        </h1>
        <h2 className="text-xl mb-4 text-white opacity-80 tracking-wide">
          Username:{" "}
          <span className="font-mono">{localStorage.getItem("username")}</span>
        </h2>

        <div className="max-h-40vh overflow-hidden flex items-center justify-center mb-6">
          <div className="aspect-w-7 aspect-h-5 w-full lg:w-12/12 flex items-center justify-center">
            <img
              src={`data:image/png;base64,${currentLvlDetails?.Lvl_Img}`}
              alt={`Level : ${currentLvlDetails?.Lvl_No}`}
              className="object-contain w-8/12 lg:w-6/12 mx-auto rounded-xl border-4 border-gray-900 shadow-lg"
            />
          </div>
        </div>
        {/* Mystery Message */}
        <div className="text-center my-4 lg:my-0 px-4">
          <p className="text-sm lg:text-xl font-semibold text-white bg-black bg-opacity-40 inline-block px-2 lg:px-4 py-2 lg:py-2 rounded-xl shadow-md animate-pulse">
            {userInputAnswer !== ""
              ? "Keep typing, the code will reveal itself..."
              : "The secrets of this level lie in your answer..."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-2 mb-6 space-x-3 lg:gap-10">
          <input
            type="text"
            placeholder="Enter your answer..."
            value={userInputAnswer}
            onChange={(e) => setUserInputAnswer(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 lg:p-2 lg:ml-7  text-lg w-6/7 focus:outline-none focus:border-blue-500 shadow-sm bg-transparent text-white placeholder-gray-400 transition-all ease-in-out duration-300"
          />
          {/* Mystery Message */}
          <div className="flex mt-3 gap-3">
            <button
              type="button"
              onClick={handleLevelAnsCheck}
              disabled={isLoading}
              className="block mx-auto bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg mb-4 transition duration-300 transform hover:scale-105"
            >
              Submit
            </button>
            <button
              type="button"
              className="block mx-auto bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg mb-4 transition duration-300 transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Level;
