import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const useAuthVerify = ({ url ,children, redirectTo }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      console.log(url);

      try {
        await axios.post(url, {}, { withCredentials: true });
        if (isMounted) setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        if (isMounted) setIsAuthenticated(false);
      }
    };
    if (url) {
      verifyAuth();
    } else {
      console.error("URL is undefined or empty.");
    }
    return () => {
      isMounted = false;
    };
  }, [url]);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default useAuthVerify;
