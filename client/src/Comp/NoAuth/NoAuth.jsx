import { useNavigate } from "react-router-dom";

const NoAuth = () => {
  const navigate = useNavigate();
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 relative overflow-hidden pt-20 px-4">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-black/30 to-black opacity-40 z-0 pointer-events-none" />
  
      <h1 className="font-pressStart text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 animate-pulse mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10 text-center">
        ⚠ ACCESS DENIED
      </h1>
  
      <p className="text-gray-400 text-sm mb-8 italic text-center font-pressStart z-10">
        Unauthorized access attempt detected. <br />
        Identification required to proceed.
      </p>
  
      {/* LOGIN button */}
      <button
        id="login"
        onClick={handleLoginAndSignUp}
        className="w-full max-w-xs mb-4 bg-[#00ffee]/10 hover:bg-[#00ffee]/20 border border-[#00ffee] text-[#00ffee] font-semibold py-2 px-4 rounded-lg transition-all duration-300 tracking-wide font-orbitron z-10"
      >
        LOGIN
      </button>
  
      {/* small text */}
      <p className="text-gray-500 text-sm my-3 z-10 font-pressStart">
        or forge a new identity
      </p>
  
      {/* SIGNUP button */}
      <button
        id="signup"
        onClick={handleLoginAndSignUp}
        className="w-full max-w-xs bg-[#39ff14]/10 hover:bg-[#39ff14]/20 border border-[#39ff14] text-[#39ff14] font-semibold py-2 px-4 rounded-lg transition-all duration-300 tracking-wide font-orbitron z-10"
      >
        SIGN UP
      </button>
  
      {/* Bottom glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-pink-700/30 to-transparent z-0" />
    </div>
  );
  
  
};

export default NoAuth;
