import React from "react";
import { useNavigate } from "react-router-dom";

const NoAuth = () => {
  const navigate = useNavigate();
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };

  return (
    <div>
      Not Accessible with login! 🥲
      <br/>
    
      <br/>
      Create a new account here! 🫡
      <p
        id="signup"
        onClick={handleLoginAndSignUp}
        style={{ cursor: "pointer" }}
      >
        SignUp
      </p>
      <br />
     Have an account! Login 😏
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

export default NoAuth;
