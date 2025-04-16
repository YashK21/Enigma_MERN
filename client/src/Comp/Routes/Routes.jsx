import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  Welcome,
  SignUp,
  Login,
  Leaderboard,
  Level,
  IntroRules,
  NoAuth,
  Admin,
  AdminLoginForm,
  Contact,
} from "../index.js";
import AuthGuard from "../../utils/AuthGuard.jsx";
import envConfig from "../../config/env.config.js";
const clientUrlDev = import.meta.env.VITE_CLIENT_URL_DEV;

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
        element: <IntroRules />,
      },
      {
        path: "level/:lvl",
        element: (
          <AuthGuard>
            <Level />
          </AuthGuard>
        ),
      },
      // <AuthGuard
      //   url={`${clientUrlDev}/level/:lvl`}
      //   redirectTo={"noauth"}
      // >
      // </AuthGuard>
      {
        path: "/admin/login",
        element: <AdminLoginForm />,
      },
      // {
      //   path: "admin",
      //   element: (
      //     <ProtectedAdminRoute>
      //       <Admin />
      //     </ProtectedAdminRoute>
      //   ),
      // },
      {
        path: "noauth",
        element: <NoAuth />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
]);

export default Routes;
