import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const isSubmittingRef = useRef(false);
  const localhost = import.meta.env.VITE_LOCALHOST;
  const prodUrl = import.meta.env.VITE_PROD;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    type: "", // success | error | loading...
    msg: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      isSubmittingRef.current ||
      status.type === "loading" ||
      status.type === "success"
    )
      return;
    isSubmittingRef.current = true;
    setStatus({ type: "loading", msg: "Logging in..." });
    try {
      const res = await axios.post(
        `${localhost}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { user, userAccessToken } = res.data.message;
      const userName = user?.username;
      Cookies.set("userAccessToken", userAccessToken);
      localStorage.setItem("username", userName);
      setStatus({ type: "success", msg: `${userName} ${res.data.data}` });
      setTimeout(() => {
        navigate("/rules");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: err.response?.data?.errorMessage || "An error occurred",
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };
  const handleLoginAndSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-md  border border-blue-500"
        onSubmit={handleLogin}
      >
        <h3 className="mb-6 text-4xl font-extrabold text-gray-900 text-center">
          Sign In
        </h3>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-center text-sm text-gray-900"
          >
            Username
          </label>
          <input
            id="username"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className=" text-center w-full px-4 py-3 mb-5 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
          />

          <label
            htmlFor="password"
            className=" text-center text-sm text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
            className=" text-center w-full px-4 py-3 mb-5 mt-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
          />
        </div>
        {status && (
          <p
            className={`text-xl md:text-lg ${
              status.type === "success" || status.type === "loading"
                ? `text-green-500`
                : `text-red-500`
            }  mb-4 text-center`}
          >
            {status.msg}
          </p>
        )}
        {status.type == `loading` || status.type === "success" ? null : (
          <button
            type="submit"
            disabled={
              status.type === "success" || status.type === "loading"
                ? true
                : false
            }
            className="w-full px-6 py-4 mb-6 text-sm font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            {status.type === "loading" ? "Signing in..." : "Sign in"}
          </button>
        )}

        <p className=" text-center text-md lg:text-sm text-gray-900">
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
