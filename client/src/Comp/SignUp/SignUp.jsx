import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const prodUrl = import.meta.env.VITE_PROD;
  const localhost = import.meta.env.VITE_LOCALHOST;
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    type: "", // success | error | loading...
    msg: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setStatus({
      type: "loading",
      msg: "Registering...",
    });
    try {
      const res = await axios.post(
        `${localhost}/register`,
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
      console.log(res.data);
      if (res.data.success) {
        setStatus({
          type: "success",
          msg: res.data.data,
        });
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
      } else {
        setStatus({
          type: "error",
          msg: "Something went wrong while registration",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response
          ? err.response.data.errorMessage
          : "An error occurred",
      });
      console.error("Something went wrong while registration", err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(()=>{
    setStatus({
      type:"",
      msg:""
    })
  },[username,email,password])
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
        {status.type == "success" || status.type == "loading" ? (
          <p className="text-lg lg:text-md text-center text-green-500 mb-4">
            {status.msg}
          </p>
        ) : (
          <p className="text-lg text-center text-red-500 mb-4">
            {status.msg}
          </p>
        )}
        <p className=" text-center text-md lg:text-sm text-gray-900">
          Already registered?{" "}
          <button
            onClick={handleLogin}
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
