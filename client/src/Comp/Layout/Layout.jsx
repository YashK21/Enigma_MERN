import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    const excludedPaths = ["/login", "/signup"];
    if (!excludedPaths.includes(location.pathname)) {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [location.pathname]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
