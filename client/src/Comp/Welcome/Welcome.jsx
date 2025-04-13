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
      {/* Subtle mist effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0" />

      {/* Mysterious Glow Animation */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse z-0" />

      <h1 className="text-3xl md:text-5xl text-center font-extrabold mb-10 text-purple-300 z-10 tracking-widest drop-shadow-md animate-fade-in">
        Enter the Land of Mystery
      </h1>

      <button
        id="signup"
        onClick={handleLoginAndSignUp}
        type="button"
        className="z-10 bg-black/40 border border-purple-400 hover:bg-purple-900/20 text-purple-300 hover:text-white font-semibold py-3 px-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 transition-all duration-500 shadow-md tracking-wide hover:scale-105 animate-fade-in"
      >
        ✦ Begin the Journey
      </button>

      <button
        id="login"
        onClick={handleLoginAndSignUp}
        type="button"
        className="z-10 bg-black/40 border border-purple-400 hover:bg-purple-900/20 text-purple-300 hover:text-white font-semibold py-3 px-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 transition-all duration-500 shadow-md tracking-wide hover:scale-105 animate-fade-in delay-150"
      >
        ✦ Unlock Secrets
      </button>
    </div>
  );
};

export default Welcome;
