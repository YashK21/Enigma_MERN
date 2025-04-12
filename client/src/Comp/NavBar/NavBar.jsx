import { Link } from "react-router-dom";
const NavBar = () => {
  // const excludedPaths = ["/"];
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Enigma</div>
        <div className="flex gap-3 lg:gap-7">
          <Link to="/rules" className="text-white hover:text-gray-300">
           Rules
          </Link>
          <Link to="/rules" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/leaderboard" className="text-white hover:text-gray-300">
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
