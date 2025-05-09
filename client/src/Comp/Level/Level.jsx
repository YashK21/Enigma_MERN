import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import lvl_Bg from "../img/lvl_Bg.jpg";
import envConfig from "../../config/env.config";
const Level = () => {
  const userContext = useOutletContext();
  const [userInputAnswer, setUserInputAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const handleLevelAnsCheck = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${envConfig.API_BASE_URL}/levelanscheck/${userContext?.userDetails?.Lvl_No}`,
        {
          username,
          userInputAnswer,
          currentLvl: userContext?.userDetails?.Lvl_No,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.statusCode == 200 && res?.data?.success == true) {
        setIsCorrect(true);
        setFeedback("correct");
      } else {
        setIsCorrect(false);
        setFeedback("wrong");
      }
    } catch (error) {
      console.log(error?.response);
      setIsCorrect(false);
      setFeedback("wrong");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setFeedback(null);
      }, 2500);
    }
  };

  useEffect(() => {
    const excludedPaths = ["/", "/login", "/signup"];
    const isExcluded = excludedPaths.includes(location.pathname);
    if (isExcluded) return;
    if (isCorrect) {
      console.log("inside isCOrrect useffect");
      const nextLevel = parseInt(userContext?.userDetails?.Lvl_No || 1) + 1;
      navigate(`/level/${nextLevel}`);
      localStorage.setItem("currentLvl", nextLevel);
    }
  }, [
    location.pathname,
    isCorrect,
    navigate,
    userContext?.userDetails?.Lvl_No,
  ]);
  const handleLogout = async () => {
    console.log("handle logout ");
    try {
      const res = await axios.post(
        `${envConfig.API_BASE_URL}/logout`,
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
      if (res?.data?.statusCode == 200) {
        localStorage.clear();
        navigate(`/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
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
      className="
        overflow-y-auto flex flex-col
        h-screen
        items-center justify-center
      "
    >
      <h1
        className="
          mb-3
          text-sm font-extrabold text-white font-pressStart
          drop-shadow-md
          lg:mt-16 lg:text-xl
        "
      >
        Level {userContext?.userDetails?.Lvl_No} - Points{" "}
        {userContext?.userDetails?.Lvl_Score}
      </h1>
      <h2
        className="
          mb-4
          text-sm text-white tracking-wide font-pressStart
          opacity-80
          lg:text-xl
        "
      >
        Username:{" "}
        <span
          className="
            font-pressStart text-sm
            lg:text-xl
          "
        >
          {localStorage.getItem("username")}
        </span>
      </h2>

      <div
        className="
          overflow-hidden flex
          max-h-40vh
          mb-6
          items-center justify-center
        "
      >
        <div
          className="
            flex
            w-full
            aspect-w-7 aspect-h-5 items-center justify-center
            lg:w-12/12
          "
        >
          <img
            src={`data:image/png;base64,${userContext?.userDetails?.Lvl_Img}`}
            alt={`Level : ${userContext?.userDetails?.Lvl_No}`}
            className="
              object-contain
              w-8/12
              mx-auto
              rounded-xl border-4 border-gray-900
              shadow-lg
              lg:w-6/12
            "
          />
        </div>
      </div>

      {/* Mystery Message */}
      <div
        className="
          my-4 px-4
          font-pressStart font-semibold text-center
          lg:my-0
        "
      >
        <p
          className="
            inline-block
            px-2 py-2
            text-xs text-white
            bg-black bg-opacity-40
            rounded-xl
            shadow-md animate-pulse
            lg:px-4 lg:py-2 lg:text-xl
          "
        >
          {userInputAnswer !== ""
            ? "Keep typing, the code will reveal itself..."
            : "The secrets of this level lie in your answer..."}
        </p>
      </div>
      {feedback && (
        <div
          className={`
      px-4 py-2 mb-3 rounded-lg text-center font-pressStart animate-pulse
      ${
        feedback === "correct"
          ? "bg-green-700 text-white"
          : "bg-red-700 text-white"
      }
      shadow-lg border-2
      ${feedback === "correct" ? "border-green-300" : "border-red-300"}
      lg:text-xl text-sm
    `}
        >
          {feedback === "correct"
            ? "Correct Answer! 🎉"
            : "Wrong Answer. Try Again! ❌"}
        </div>
      )}

      <div
        className="
          flex flex-col
          mt-2 mb-6 space-x-3
          items-center justify-center
          lg:gap-5
        "
      >
        <input
          type="text"
          placeholder="Unlock Clue"
          value={userInputAnswer}
          onChange={(e) => setUserInputAnswer(e.target.value)}
          className="
            p-2
            font-pressStart text-xs lg:text-lg text-center text-white placeholder-gray-400
            bg-transparent
            border-2 border-gray-300 rounded-md
            shadow-sm transition-all
            focus:outline-none focus:border-blue-500 ease-in-out duration-300
          w-4/5  lg:p-2 lg:ml-7

          "
        />
        {/* Mystery Message */}
        <div
          className="
            flex
            mt-3
            font-pressStart
            gap-3
            text-xs
            lg:text-xl
          "
        >
          <button
            type="button"
            onClick={handleLevelAnsCheck}
            disabled={isLoading}
            className="
              block
              mx-auto py-1 px-4 mb-4
              text-white font-bold
              bg-green-600
              rounded-lg
              
              hover:bg-green-800 transition duration-300 transform hover:scale-105
            "
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="
              block
              mx-auto px-6 mb-4
              text-white font-bold
              bg-red-600
              rounded-lg
              hover:bg-red-800 transition duration-300 transform hover:scale-105
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level;
