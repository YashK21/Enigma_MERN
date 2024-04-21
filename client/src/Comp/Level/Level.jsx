import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Level = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  let [lvlImg, setLvlImg] = useState();
  let [lvlAns, setLvlAns] = useState("");
  const navigate = useNavigate();
  let { lvl: initialLvl } = useParams();
  let [lvl, setLvl] = useState(initialLvl);

  const handleLvlImg = async () => {
    try {
      let res = await fetch(`${prodUrl}/api/v1/level/${lvl}`, {
        credentials: "include",
      });
      res = await res.json();
      const imgData = await res.message;
      setLvlImg(imgData);
      return lvl;
    } catch (error) {
      console.error("Failed to fetch level image:", error);
    }
  };
  const handleLevelAnsCheck = async () => {
    try {
      let res = await fetch(`${prodUrl}/api/v1/levelanscheck/${lvl}`, {
        method: "POST",
        body: JSON.stringify({ ans: lvlAns }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      res = await res.json();
      if (res.success) {
        console.log("Correct Answer!", res.message);
        // lvl = Number(lvl); lvl = lvl + 1; console.log(lvl);
        setLvl((prevLvl) => {
          const newLvl = Number(prevLvl) + 1;
          Cookies.set("currentLvl", newLvl, { sameSite: "strict" });
          return newLvl;
        });
        setLvlAns("");
      } else {
        console.log("Wrong Answer!", res.errorMessage);
      }
      // return lvl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentLvl = async () => {
    try {
      let res = await fetch(`${prodUrl}/api/v1/level/${lvl}`, {
        credentials: "include",
      });
      res = await res.json();
      // console.log(res)
    } catch (error) {
      console.log(error, "from current lvl");
    }
  };
  useEffect(() => {
    const currentLvl = Cookies.get("currentLvl");
    if (currentLvl) {
      setLvl(currentLvl);
    }
    handleLvlImg();
    navigate(`/level/${lvl}`); //bcz this makes the url changes from /1 to /2 when lvl changes without this the content only gets changed not the url
    handleCurrentLvl();
  }, [lvl, navigate]); //Including navigate in the dependency array might seem unnecessary since it's unlikely to change during the component's lifecycle ,included to avoid potential bugs (eg-if conti re-renders due to any reason)

  const handleLogout = async () => {
    try {
      await fetch(`${prodUrl}/api/v1/logout`, {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("userAccessToken");
      Cookies.remove("userRefreshToken");
      localStorage.removeItem("username");
      // Cookies.set("currentLvl", lvl, { secure: true, httpOnly: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-4">Level {lvl}</h1>
      <h2 className="text-lg mb-4">
        Username:
        {localStorage.getItem("username")}
      </h2>{" "}
      <img
        src={`data:image/png;base64,${lvlImg}`}
        alt={`Level : ${lvl}`}
        className="mx-auto max-w-screen-lg max-h-screen-3/4"
      />
      <br />
      <div class="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Enter text here"
          value={lvlAns}
          onChange={(e) => setLvlAns(e.target.value)}
          class="border-2 border-gray-300 m-3 rounded-md p-2 focus:outline-none focus:border-blue-500 shadow-sm"
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
      <button
        className="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Level;
