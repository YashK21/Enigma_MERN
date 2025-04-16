import { Link } from "react-router-dom";
const NavBar = () => {
  // const excludedPaths = ["/"];
  return (
    <nav className="p-4 fixed top-0 left-0 w-full">
      <div className="gap-2 flex justify-between items-center">
        <div className="font-pressStart text-white text-xs font-bold lg:text-xl">
        <Link
            onClick={() => console.log("clicked")}
            to="/"
            className="text-white hover:text-gray-300 font-pressStart"
          >
            Enigma
            </Link>
        </div>
        <div className="flex gap-4 lg:gap-7 text-xs lg:text-xl">
          <Link
            onClick={() => console.log("clicked")}
            to="/rules"
            className="text-white hover:text-gray-300 font-pressStart"
          >
            Rules
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 font-pressStart "
          >
            Contact
          </Link>
          <Link
            to="/leaderboard"
            className="text-white hover:text-gray-300 font-pressStart "
          >
            HOF
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
