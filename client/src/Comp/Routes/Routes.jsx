import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Welcome from "../Welcome/Welcome.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import Login from "../Login/Login.jsx";
import Level from "../Level/Level.jsx";
import IntroRules from "../IntroRules/IntroRules.jsx";
import Cookies from "js-cookie";
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
          <ProtectedRoute>
            <IntroRules />
          </ProtectedRoute>
        ),
      },
      {
        path: "level/:lvl",
        element: (
          <ProtectedRoute>
            <Level />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
let accessToken = Cookies.get("accessToken");

function ProtectedRoute({ children }) {
  const isAuth = !!accessToken;
  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
}
export default Routes;
// const routes = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<Welcome />} />
//       <Route path="login" element={<Login />} />
//       <Route path="signup" element={<SignUp />} />
//       <Route element={ProtectedRoute}>
//         <Route
//           path="rules"
//           element={accessToken ? <IntroRules /> : <NoAuth />}
//         />
//       </Route>
//       <Route
//         path="level/:lvl"
//         element={accessToken ? <Level /> : <Navigate to="/login" />}
//       />
//     </Route>
//   )
// );
