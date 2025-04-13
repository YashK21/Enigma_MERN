import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    const excludedPaths = ["/login", "/signup"];
    if (!excludedPaths.includes(location.pathname)) {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [location.pathname]);
  const userName = localStorage.getItem("username");
  const currentPath = localStorage.getItem("currentPath");
  return (
    <>
      {userName && currentPath?.startsWith(`/level/`) ? <NavBar /> : null}
      <Outlet />
    </>
  );
};

export default Layout;
