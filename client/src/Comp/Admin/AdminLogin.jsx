import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const AdminLoginForm = () => {
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let res = await fetch(`${localhost}/admin/login`, {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   credentials: "include",
    // });

    await axios.post(
      `${prodUrl}/admin/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
      }
    )
    .then((res)=>{
      // console.log(res)
      let loggedInAdmin = res.data.message.admin.username
      // console.log(loggedInAdmin)
      localStorage.setItem("adminUsername" , loggedInAdmin)
      Cookies.set("adminAccessToken", res.data.message.adminAccessToken)
      setUsername("")
      setPassword("")
      setMsg(res.data.data)
      setTimeout(()=>{
        navigate("/admin")
      },1000)
    })
    .catch((err)=>{
      console.error(err)
      setMsg(err.response ? err.response.data.errorMessage : 'An error occurred')
    })
    // if (!res.ok) {
    //   res = await res.json();
    //   console.log(res.ok);
    //   console.log(res?.errorMessage);
    //   return setMsg(res?.errorMessage);
    // }
    // res = await res.json();
    // console.log(res.data);
    // let loggedInAdmin = res.message.admin.username;
    // localStorage.setItem("admin", loggedInAdmin);
    // setUsername("");
    // setPassword("");
    // setMsg(res.data);
    // setTimeout(() => {
    //   navigate("/admin");
    // }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
      <div>{msg}</div>
    </div>
  );
};

export default AdminLoginForm;
