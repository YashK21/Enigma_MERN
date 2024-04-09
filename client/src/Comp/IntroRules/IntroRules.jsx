import React from "react";
import { useNavigate } from "react-router-dom";

const IntroRules = () => {
  const navigate = useNavigate();
const handleEnterGame = () => {
  navigate("/level/1")
}
  return (
    <>
      <h2>IntroRules</h2>
      <button onClick={handleEnterGame}>Move to the game</button>
    </>
  );
};

export default IntroRules;
