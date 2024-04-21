import React, { useEffect, useState } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Welcome from "../Welcome/Welcome.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import Login from "../Login/Login.jsx";
import Level from "../Level/Level.jsx";
import IntroRules from "../IntroRules/IntroRules.jsx";
import NoAuth from "../NoAuth/NoAuth.jsx";
import Cookies from "js-cookie";
import Admin from "../Admin/Admin.jsx";
import AdminLoginForm from "../Admin/AdminLogin.jsx";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "rules",
        element: (
          <ProtectedUserRoute>
            <IntroRules />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "level/:lvl",
        element: (
          <ProtectedUserRoute>
            <Level />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "/admin/login",
        element: <AdminLoginForm />,
      },
      {
        path: "admin",
        element: (
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "noauth",
        element: <NoAuth />,
      },
    ],
  },
]);
// const routes = createBrowserRouter(
//     createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
// <Route path="" element={<Welcome />} />
// <Route path="login" element={<Login />} />
// <Route path="signup" element={<SignUp />} />
// <Route element={<ProtectedRoute/>}>
//   <Route
//     path="rules"
//     element={<IntroRules />}
//   />
// </Route>
// <Route
//   path="level/:lvl"
//   element={ <Level /> }
// />
// </Route>
// )
// );
function ProtectedUserRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    let userAccessToken = Cookies.get("userAccessToken");
    if (userAccessToken) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  if (!isAuth) {
    return <Navigate to="/noauth" />;
  }

  return children;
}

function ProtectedAdminRoute({ children }) {
  const adminAccessToken = Cookies.get("adminAccessToken");
  const isAuth = !!adminAccessToken;
  if (isAuth) return children;
  {
    alert("Trying to act smart? haha! Go login first!");
  }
  return <Navigate to="/admin/login" />;
}
export default Routes;
