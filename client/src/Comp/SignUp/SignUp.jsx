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
        `${prodUrl}/register`,
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

  useEffect(() => {
    setStatus({
      type: "",
      msg: "",
    });
  }, [username, email, password]);
  return (
    <div className="flex font-orbitron justify-center items-center h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <form
        className="w-full max-w-md px-8 py-10 bg-[#0f0f11]/80 backdrop-blur-md rounded-xl shadow-[0_0_20px_2px_rgba(128,0,255,0.2)]"
        onSubmit={handleSignUp}
      >
        <h3 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-wider animate-pulse">
          Initiate Protocol
        </h3>

        <div className="flex flex-col space-y-5">
          <div>
            <label
              htmlFor="username"
              className="font-pressStart block text-sm text-gray-300 text-center"
            >
              Codename
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Choose your identity"
              className="font-pressStart w-full px-4 py-3 mt-1 text-white bg-[#1a1a1e] border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500 text-center"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="font-pressStart block text-sm text-gray-300 text-center"
            >
              Secure Line (Email)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="classified@example.com"
              className="font-pressStart w-full px-4 py-3 mt-1 text-white bg-[#1a1a1e] border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 text-center"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-pressStart block text-sm text-gray-300 text-center"
            >
              Cipher Key
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Whisper the Secret"
              className="font-pressStart w-full px-4 py-3 mt-1 text-white bg-[#1a1a1e] border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500 text-center"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full px-6 py-4 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-300 shadow-lg"
        >
          Enter the System
        </button>

        <p className="mt-6 text-center text-md">
          {status?.msg && (
            <span
              className={`font-mono tracking-widest text-sm shadow-sm ${
                status.type === "success"
                  ? "text-green-400 before:content-['✔'] before:mr-2 before:text-green-600"
                  : status.type === "loading"
                  ? "text-yellow-300 before:content-['↻'] before:mr-2 before:text-yellow-500"
                  : "text-red-400 before:content-['✖'] before:mr-2 before:text-red-600"
              }`}
            >
              {status.type === "loading"
                ? "↻ System is initializing…"
                : status.type === "success"
                ? "✔ Sequence complete. Access granted."
                : "✖ Access denied. Resetting protocols..."}
              <span className="opacity-60 block mt-1 text-sm">
                {status.msg}
              </span>
            </span>
          )}
        </p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already initiated?{" "}
          <button
            onClick={handleLogin}
            className="underline underline-offset-4 text-blue-400 font-semibold hover:text-purple-300"
          >
            Re-Access Portal
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
