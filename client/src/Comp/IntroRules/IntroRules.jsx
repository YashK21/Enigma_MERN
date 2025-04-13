import { useNavigate } from "react-router-dom";
const IntroRules = () => {
  const navigate = useNavigate();
  const path = localStorage.getItem("currentPath");

  const handleEnterGame = () => {
    path == "/" || path == "/rules" ? navigate("/level/1") : navigate(path);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-wide text-center text-purple-400 drop-shadow-lg">
        🕳️ The Enigma Awaits
      </h1>

      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-xl w-full max-w-xl space-y-4 text-sm sm:text-base">
        <div className="flex items-start space-x-2">
          <span className="text-purple-500 text-lg">🧠</span>
          <p>
            <span className="text-white font-semibold">Solve to ascend —</span>{" "}
            Levels hold veiled scores. Deeper means deadlier... and more
            rewarding.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-pink-400 text-lg">⏳</span>
          <p>
            <span className="text-white font-semibold">
              Time whispers secrets —
            </span>{" "}
            Leaderboards favor the swift. First solves rise highest.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-blue-400 text-lg">🎯</span>
          <p>
            <span className="text-white font-semibold">
              No penalty for folly —
            </span>{" "}
            Wrong attempts don’t hurt, but don't awaken suspicion with infinite
            retries.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-red-400 text-lg">🎭</span>
          <p>
            <span className="text-white font-semibold">
              Final word lies with the Overseer —
            </span>{" "}
            The Admin knows. The Admin decides.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-yellow-400 text-lg">♻️</span>
          <p>
            <span className="text-white font-semibold">
              Try. Fail. Repeat —
            </span>{" "}
            But beware the loop... too many tries and the void might notice you.
          </p>
        </div>
      </div>

      <button
        onClick={handleEnterGame}
        className="mt-10 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
      >
        🌀 Enter the Game
      </button>
    </div>
  );
};

export default IntroRules;
