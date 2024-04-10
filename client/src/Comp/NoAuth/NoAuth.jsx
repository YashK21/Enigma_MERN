import React from "react";
import { useNavigate } from "react-router-dom";

const NoAuth = () => {
  const navigate = useNavigate();
  const handleLoginAndSignUp = (e) => {
    if (e.target.id === "login") navigate("/login");
    else if (e.target.id === "signup") navigate("/signup");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Not Authorized</h2>
          <p className="text-gray-700 mb-4">
            You are not authorized to access this page. Please log in to access
            this content.
          </p>
          <p
            id="login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={handleLoginAndSignUp}
          >
            Login
          </p>
          <p className="text-gray-700 mb-4">
          <br/>
           Not Having An Account ? Create One
          </p>
          <p
            id="signup"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={handleLoginAndSignUp}
          >
            SignUp
          </p>
        </div>
      </div>
    </>
  );
};

export default NoAuth;
