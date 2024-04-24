import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const Login = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    setMsg("");
    e.preventDefault();
    // let res = await fetch(`${localhost}/api/v1/login`, {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });
    await axios
      .post(
        `${localhost}/api/v1/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "content-Type": "application/json",
          },
          withCredentials:true
        },
      )
      .then((res) => {
        let user = res.data.message.user.username;
        // console.log(user)
        let userAccessToken = res.data.message.userAccessToken;
        Cookies.set("userAccessToken", userAccessToken);
        localStorage.setItem("username", user);
        setMsg(`${user} ${res.data.data}`);
        setTimeout(() => {
          navigate("/rules");
        }, 2000);
      })
      .catch((err) => {
        console.error(err)
        setMsg(err.response ? err.response.data.errorMessage : 'An error occurred');
      });
  };
  const handleLoginAndSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-4xl font-extrabold text-gray-900 text-center">
          Sign In
        </h3>
        <label htmlFor="username" className="text-sm text-gray-900">
          Username
        </label>
        <input
          id="username"
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-3 mb-5 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
        />
        <label htmlFor="password" className="text-sm text-gray-900">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="w-full px-4 py-3 mb-5 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
        />
        <button
          onClick={handleLogin}
          className="w-full px-6 py-4 mb-6 text-sm font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Sign In
        </button>
        {msg ? <p className="text-sm text-green-500 mb-4">{msg}</p> : <p className="text-sm text-red-500 mb-4">{msg}</p>}
        <p className="text-sm text-gray-900">
          Not registered yet?{" "}
          <button
            onClick={handleLoginAndSignUp}
            className="font-bold text-purple-500"
          >
            Create an Account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
