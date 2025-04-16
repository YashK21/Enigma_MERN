// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// const useAuthVerify = ({ url ,children, redirectTo }) => {

//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   useEffect(() => {
//     let isMounted = true;
//     const verifyAuth = async () => {
//       console.log(url);

//       try {
//         if (isMounted) setIsAuthenticated(true);
//       } catch (error) {
//         console.log(error);
//         if (isMounted) setIsAuthenticated(false);
//       }
//     };
//     if (url) {
//       verifyAuth();
//     } else {
//       console.error("URL is undefined or empty.");
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, [url]);
//   return isAuthenticated ? children : <Navigate to={redirectTo} />;
// };

// export default useAuthVerify;

import { useState, useEffect } from "react";
import axios from "axios";
import envConfig from "../config/env.config";

const useAuthVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${envConfig.API_BASE_URL}/verify-jwt`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        setIsAuthenticated(res.data.data.autheticated === true ? true : false);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuthVerify;

// await axios.post(url, {}, { withCredentials: true });
