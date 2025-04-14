import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const isSubmittingRef = useRef(false);
  // const localhost = import.meta.env.VITE_LOCALHOST;
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
        `${prodUrl}/login`,
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
      console.log(user);
      const lastLvlComplete =
        user.lastCompletedLvls[user.lastCompletedLvls.length - 1];
      console.log(lastLvlComplete?.levelValue + 1);

      if (parseInt(lastLvlComplete?.levelValue || 1) !== 1) {
        navigate(`/level/${lastLvlComplete?.levelValue + 1}`);
      } else {
        navigate("/rules");
      }
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
  useEffect(() => {
    setStatus({
      type: "",
      msg: "",
    });
  }, [username, password]);
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <form
        className="w-full max-w-md px-8 py-5 bg-[#0f0f11]/80 backdrop-blur-md rounded-xl shadow-[0_0_20px_2px_rgba(0,0,255,0.2)]"
        onSubmit={handleLogin}
      >
        <h3 className="mb-8 text-4xl font-orbitron text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 tracking-wider animate-pulse">
          Access Console
        </h3>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm text-center text-gray-300 font-pressStart"
            >
              Identity Code
            </label>
            <input
              id="username"
              type="text"
              placeholder="Who are you?"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="font-pressStart text-center w-full px-4 py-3 mt-1 bg-[#1a1a1e] text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm text-center text-gray-300 font-pressStart"
            >
              Cipher Key
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Whisper the Secret"
              className="font-pressStart text-center w-full px-4 py-3 mt-1 bg-[#1a1a1e] text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />
          </div>
        </div>

        {status?.msg && (
          <div
            className={`mt-6 px-6 py-4 text-center text-sm font-mono rounded-md shadow-md tracking-wider border
        ${
          status.type === "success"
            ? "bg-[#111827] text-green-400 border-green-600"
            : status.type === "loading"
            ? "bg-[#1f2937] text-yellow-300 border-yellow-500"
            : "bg-[#1f2937] text-rose-400 border-rose-600"
        }
      `}
          >
            {status.type === "loading"
              ? "↻ Initiating sequence..."
              : status.type === "success"
              ? "✓ Sequence complete. Access granted."
              : "✗ Sequence failed. Resetting protocols..."}
            <div className="mt-1 text-sm opacity-70">{status.msg}</div>
          </div>
        )}

        {status.type !== "loading" && status.type !== "success" && (
          <button
            type="submit"
            className="mt-6 w-full px-6 py-3 text-sm font-pressStart font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 shadow-lg"
          >
            {status.type === "loading"
              ? "Decrypting Access..."
              : "Enter the Portal"}
          </button>
        )}

        <p className="font-orbitron mt-6 text-center text-sm text-gray-400">
          Not a registered Operator?{" "}
          <button
            onClick={handleLoginAndSignUp}
            className="underline underline-offset-4 text-blue-400 font-semibold hover:text-purple-300"
          >
            Initiate Clearance
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
