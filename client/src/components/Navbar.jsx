import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex items-center py-4 md:px-20 px-3 justify-between bg-slate-900 text-white">
      <Link to={"/"}>
        <p className="font-semibold md:text-2xl text-lg tracking-wider">
          CodeEngine
        </p>
      </Link>
      {isLoggedIn ? (
        <button
          className="md:px-6 px-4 md:py-1.5 py-1 bg-white text-black rounded text-[1.1rem]"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link
          className="md:px-6 px-4 md:py-1.5 py-1 bg-white text-black rounded text-[1.1rem]"
          to={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
