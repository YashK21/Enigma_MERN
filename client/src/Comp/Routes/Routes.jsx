import React from "react";
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
let accessToken = Cookies.get("accessToken");
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
        element: (
          <AdminLoginForm/>
        ),
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "noauth",
        element: !accessToken ? <NoAuth/> : <ProtectedUserRoute/>
      },
    ],
  },
]);

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
   accessToken = Cookies.get("accessToken");
  const isAuth = !!accessToken;
  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/noauth"/>;
}
export default Routes;

// const routes = createBrowserRouter(
