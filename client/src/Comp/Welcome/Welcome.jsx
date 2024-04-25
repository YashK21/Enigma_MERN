import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../img/bg.jpg";
const Welcome = () => {
  const navigate = useNavigate();
  console.log("first")
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-blue-300">Welcome to the land of mystery!</h1>
      <p
        id="signup"
        onClick={handleLoginAndSignUp}
        // style={{ cursor: "pointer" }}
        className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-purple-400 font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 shadow-lg"
      >
        SignUp
      </p>
      <br />
      <p
        id="login"
        onClick={handleLoginAndSignUp}
        // style={{ cursor: "pointer" }}
        className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-purple-400 font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 shadow-lg"
      >
        Login
      </p>
    </div>
  );
};

export default Welcome;
