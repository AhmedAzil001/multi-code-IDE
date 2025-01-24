import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";

const Navbar = ({ user }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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
        <div className="flex gap-5 border border-gray-700 px-4 md:py-2 py-1.5 rounded bg-slate-800 ">
          <div>{user?.name}</div>
          <img
            id="logout"
            src={logout}
            width={20}
            alt=""
            className="cursor-pointer"
            onClick={handleLogout}
          />
          
        </div>
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
