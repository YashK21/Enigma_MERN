// import { Navigate } from "react-router-dom";
// import useAuthVerify from "../hooks/useAuthVerify";
// const AuthGuard = (props) => {
//   const { url, children, redirectTo } = props;
//   console.log(url, children, redirectTo);

//   const isAuthenticated = useAuthVerify(url);
//   if (isAuthenticated === null) {
//   }
//   return isAuthenticated ? children : <Navigate to={redirectTo} />;
// };

// export default AuthGuard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthVerify from "../hooks/useAuthVerify";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticatedUser = useAuthVerify();

  useEffect(() => {
    if (isAuthenticatedUser === false) {
      navigate("/noauth");
    }
  }, [isAuthenticatedUser,navigate]);

  if (isAuthenticatedUser === null) {
    return <div>Checking authentication...</div>;
  }

  return isAuthenticatedUser ? children : null;
};

export default AuthGuard;

// return (
//   <div className="h-screen flex items-center justify-center text-white bg-black text-xl font-mono animate-pulse">
//     Verifying access...
//   </div>
// );
