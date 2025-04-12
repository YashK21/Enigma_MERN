import { Navigate, createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
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
function ProtectedUserRoute({ children }) {
  const userAccessToken = Cookies.get("userAccessToken");
  if (userAccessToken) return children;
  return <Navigate to="/noauth" />;
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
