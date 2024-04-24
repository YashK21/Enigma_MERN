import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const prodUrl = import.meta.env.VITE_PROD;
  const localhost = import.meta.env.VITE_LOCALHOST;

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${localhost}/api/v1/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.data.success) {
        alert("SignUp Successful");
        navigate("/login");
      } else {
        alert("Something went wrong while registration");
      }
    } catch (err) {
      setMsg(err.response ? err.response.data.errorMessage : 'An error occurred');
      console.error("Something went wrong while registration", err);
    }
  };

  const handleLoginAndSignUp = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-4xl font-extrabold text-gray-900 text-center">
          SignUp
        </h3>

        <label htmlFor="username" className="text-sm text-gray-900">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
          className="w-full px-4 py-3 mb-5 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
        />

        <label htmlFor="email" className="text-sm text-gray-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
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
          placeholder="Enter password"
          className="w-full px-4 py-3 mb-6 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
        />

        <button
          onClick={handleSignUp}
          className="w-full px-6 py-4 mb-6 text-sm font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Sign Up
        </button>
        {msg && <p className="text-sm text-red-500 mb-4">{msg}</p>}        <p className="text-sm text-gray-900 text-center">
          Already registered?{" "}
          <button
            onClick={handleLoginAndSignUp}
            className="font-bold text-purple-500"
          >
            Login Here!
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
