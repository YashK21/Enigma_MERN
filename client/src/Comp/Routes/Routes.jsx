import React from "react";
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
import NoAuth from "../NoAuth/NoAuth.jsx";
const accessToken = Cookies.get("accessToken");

// const Routes = createBrowserRouter([
//   {
//     path:"/",
//     element:<Layout/>,
//     children: [
//       {
//         path:"/",
//         element:<Welcome/>,
//       },
//       {
//         path:"login",
//         element:<Login/>
//       },
//       {
//         path:"signup",
//         element:<SignUp/>
//       },
//       {
//         path:"login",
//         element:<Logout/>
//       }
//     ]
//   }
// ])
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      {/* <Route path='rules' element={accessToken ? <IntroRules/> : <NoAuth/>}/> */}
      <Route
        path="rules"
        element={accessToken ? <IntroRules /> : <Navigate to="/login" />}
      />

      <Route
        path="level/:lvl"
        element={accessToken ? <Level /> : <Navigate to="/login" />}
      />
    </Route>
  )
);

export default routes;
