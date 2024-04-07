import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };
  return (
    <div>
      <p
        id="signup"
        onClick={handleLoginAndSignUp}
        style={{ cursor: "pointer" }}
      >
        SignUp
      </p>
      <br />
      <p
        id="login"
        onClick={handleLoginAndSignUp}
        style={{ cursor: "pointer" }}
      >
        Login
      </p>
    </div>
  );
};

export default Welcome;
