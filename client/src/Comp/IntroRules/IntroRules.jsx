import { useNavigate } from "react-router-dom";
const IntroRules = () => {
  const navigate = useNavigate();
  const path = localStorage.getItem("currentPath");

  const handleEnterGame = () => {
    path =="/" || path =="/rules" ?  navigate("/level/1") :navigate(path) 
  };
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
