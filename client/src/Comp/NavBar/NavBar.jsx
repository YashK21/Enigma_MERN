import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Enigma</div>
        <div className="ml-4 flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
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
