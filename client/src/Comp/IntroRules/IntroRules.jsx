import React from "react";
import { useNavigate } from "react-router-dom";

const IntroRules = () => {
  const navigate = useNavigate();
const handleEnterGame = () => {
  navigate("/level/1")
}
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleEnterGame}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Move to the game
      </button>
    </div>
  );
};

export default IntroRules;
