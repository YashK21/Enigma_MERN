import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Level = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  let [lvlImg, setLvlImg] = useState();
  let [lvlAns, setLvlAns] = useState("");
  const navigate = useNavigate();
  let { lvl: initialLvl } = useParams();
  let [lvl, setLvl] = useState(initialLvl);
  const userAccessToken = Cookies.get("userAccessToken");
  const handleLvlImg = async () => {
    // try {
    //   let res = await fetch(`${localhost}/api/v1/level/${lvl}`, {
    //     headers: {
    //       "content-Type": "application/json",
    //       Authorization: `Bearer ${userAccessToken}`,
    //     },
    //     credentials: "include",
    //   });
    //   res = await res.json();
    //   const imgData = await res.message;
    //   setLvlImg(imgData);
    //   return lvl;
    // } catch (error) {
    //   console.error("Failed to fetch level image:", error);
    // }
    await axios
      .get(`${prodUrl}/api/v1/level/${lvl}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const imgData = res.data.message;
        // console.log(imgData)
        setLvlImg(imgData);
        // console.log(lvl);
        return lvl;
      })
      .catch((err) => {
        console.error("Failed to fetch level image:", err);
      });
  };
  const handleLevelAnsCheck = async () => {
    await axios
      .post(
        `${prodUrl}/api/v1/levelanscheck/${lvl}`,
        {
          ans: lvlAns,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAccessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          console.log("Correct Answer!", res.data.data);
          setLvl((prevLvl) => {
            const newLvl = Number(prevLvl) + 1;
            Cookies.set("currentLvl", newLvl);
            return newLvl;
          });
          setLvlAns("");
        } else {
          console.log("Wrong Answer!", res.data.errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCurrentLvl = async () => {
    await axios
      .get(`${prodUrl}/api/v1/level/${lvl}`, {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
    // console.log("handle logout ");
    // await axios
    //   .post(`${prodUrl}/api/v1/logout`, {
    //     headers: {
    //       "content-Type": "application/json",
    //       Authorization: `Bearer ${userAccessToken}`,
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     Cookies.remove("userAccessToken");
    //     Cookies.remove("connect.sid");
    //     localStorage.removeItem("username");
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log("Failed to logout", err);
    //   });
    console.log("handle logout ");
  try {
    await fetch(`${localhost}/api/v1/logout`, {
      method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
    })
    Cookies.remove("userAccessToken");
    Cookies.remove("connect.sid");
    localStorage.removeItem("username");
    navigate("/login");
  } catch (error) {
console.log(error)
  }
  
  }
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
      <div className="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Enter text here"
          value={lvlAns}
          onChange={(e) => setLvlAns(e.target.value)}
          className="border-2 border-gray-300 m-3 rounded-md p-2 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        <button
          type="submit"
          onClick={handleLevelAnsCheck}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
