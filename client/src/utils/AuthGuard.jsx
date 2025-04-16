import { Navigate } from "react-router-dom";
import useAuthVerify from "../hooks/useAuthVerify";
const AuthGuard = ({ url, children, redirectTo }) => {
  const isAuthenticated = useAuthVerify(url);
  if (isAuthenticated === null) {

    return (
      <div className="h-screen flex items-center justify-center text-white bg-black text-xl font-mono animate-pulse">
        Verifying access...
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default AuthGuard;
