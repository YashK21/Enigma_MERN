import { useNavigate } from "react-router-dom";

const IntroRules = () => {
  const navigate = useNavigate();
  const handleEnterGame = () => {
    const currentLvl = localStorage.getItem("currentLvl")
    console.log(currentLvl);
    currentLvl ? navigate(`/level/${currentLvl}`)
:    navigate(`/level/1`);
  };
  const rulesDesc = [
    {
      icon: "🧠",
      color: "text-purple-400",
      title: "Solve to ascend —",
      desc: "Levels hold veiled scores. Deeper means deadlier... and more rewarding.",
    },
    {
      icon: "⏳",
      color: "text-pink-400",
      title: "Time whispers secrets —",
      desc: "Leaderboards favor the swift. First solves rise highest.",
    },
    {
      icon: "🎯",
      color: "text-blue-400",
      title: "No penalty for folly —",
      desc: "Wrong attempts don’t hurt, but don’t awaken suspicion with infinite retries.",
    },
    {
      icon: "🎭",
      color: "text-red-400",
      title: "Final word lies with the Overseer —",
      desc: "The Admin knows. The Admin decides.",
    },
    {
      icon: "♻️",
      color: "text-yellow-300",
      title: "Try. Fail. Repeat —",
      desc: "But beware the loop... too many tries and the void might notice you.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 pt-24 relative overflow-hidden">
      {/* Aesthetic matrix-style glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/10 via-black/30 to-black opacity-30 pointer-events-none" />

      {/* Enigmatic Heading */}
      <h1 className="font-pressStart text-5xl sm:text-6xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] z-10">
        The Enigma Awaits
      </h1>

      {/* Mystical Rule Box */}
      <div className="backdrop-blur-md bg-white/5  rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.15)] p-6 sm:p-8 w-full max-w-2xl space-y-5 z-10 text-sm sm:text-base">
        {rulesDesc.map((item, i) => (
          <div key={i} className="font-pressStart flex items-start space-x-3">
            <span className={`${item.color} text-lg animate-pulse`}>
              {item.icon}
            </span>
            <p className="leading-relaxed">
              <span className="text-white font-semibold">{item.title} </span>
              <span>{item.desc}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Enter Button */}
      <button
        onClick={handleEnterGame}
        className="font-orbitron mt-12 mb-8 px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10"
      >
        🌀 Enter the Game
      </button>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-purple-900/20 to-transparent z-0 pointer-events-none" />
    </div>
  );
};
export default IntroRules;
