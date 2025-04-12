import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import lvl_Bg from "../img/lvl_Bg.jpg";
import NavBar from "../NavBar/NavBar";
const Level = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  // const prodUrl = import.meta.env.VITE_PROD;
  let [lvlImg, setLvlImg] = useState();
  let [lvlAns, setLvlAns] = useState("");
  const navigate = useNavigate();
  let { lvl: initialLvl } = useParams();
  let [lvl, setLvl] = useState(initialLvl);
  const userAccessToken = Cookies.get("userAccessToken");

  const handleLvlImg = async () => {
    await axios
      .get(`${localhost}/level/${lvl}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const imgData = res?.data?.message;
        setLvlImg(imgData);
        return lvl;
      })
      .catch((err) => {
        console.error("Failed to fetch level image:", err);
      });
  };
  const handleLevelAnsCheck = async () => {
    await axios
      .post(
        `${localhost}/levelanscheck/${lvl}`,
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

  useEffect(() => {
    const currentLvl = Cookies.get("currentLvl");

    if (currentLvl) {
      setLvl(currentLvl);
    }
    handleLvlImg();
    navigate(`/level/${lvl}`);
    localStorage.setItem("currentPath", `/level/${lvl}`);
    //bcz this makes the url changes from /1 to /2 when lvl changes without this the content only gets changed not the url
  }, [lvl, navigate]); //Including navigate in the dependency array might seem unnecessary since it's unlikely to change during the component's lifecycle ,included to avoid potential bugs (eg-if conti re-renders due to any reason)

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
      localStorage.clear()
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <div
        className="h-screen overflow-y-auto flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${lvl_Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Source Code Pro",
          fontWeight: 600,
          fontOpticalSizing: "auto",
          fontStyle: "normal",
        }}
      >
        <h1 className="text-2xl font-semibold mt-9 mb-2 text-white">
          Level {lvl}
        </h1>
        <h2 className="text-lg mb-2 text-white">
          Username: {localStorage.getItem("username")}
        </h2>
        <div className="max-h-60vh overflow-hidden flex items-center justify-center">
          <div className="aspect-w-7 aspect-h-5 w-full flex items-center justify-center">
            <img
              src={`data:image/png;base64,${lvlImg}`}
              alt={`Level : ${lvl}`}
              className="object-contain w-6/12 mx-auto"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-2">
          <input
            type="text"
            placeholder="Enter text here"
            value={lvlAns}
            onChange={(e) => setLvlAns(e.target.value)}
            className="border-2 border-gray-300 m-2 rounded-md p-2 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <button
            type="submit"
            onClick={handleLevelAnsCheck}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <button
          className="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Level;
