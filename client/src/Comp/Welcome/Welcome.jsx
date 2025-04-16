import { useNavigate } from "react-router-dom";
import bg from "../img/bg.jpg";
const Welcome = () => {
  const navigate = useNavigate();
  console.log("home");
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };
  return (
    <div
  className="flex flex-col items-center justify-center h-screen text-white gap-6 relative overflow-hidden"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Mist Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0" />

  {/* Soft Glow Aura */}
  <div className="absolute w-[300px] h-[300px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse z-0" />

  {/* Title */}
  <h1 className="text-4xl sm:text-5xl text-center font-pressStart text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] z-10 tracking-wide">
    Enter the Land of Mystery
  </h1>

  {/* Signup Button (Begin the Journey) */}
  <button
    id="signup"
    onClick={handleLoginAndSignUp}
    type="button"
    className="z-10 w-[250px] bg-black/30 border border-purple-400 hover:bg-purple-800/20 text-purple-300 hover:text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-500 tracking-wide hover:scale-105 font-orbitron"
  >
    ✦ Begin the Journey
  </button>

  {/* Login Button (Unlock Secrets) */}
  <button
    id="login"
    onClick={handleLoginAndSignUp}
    type="button"
    className="z-10 w-[250px] bg-black/30 border border-purple-400 hover:bg-purple-800/20 text-purple-300 hover:text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-500 tracking-wide hover:scale-105 font-orbitron"
  >
    ✦ Unlock Secrets
  </button>
</div>

  );
};

export default Welcome;
