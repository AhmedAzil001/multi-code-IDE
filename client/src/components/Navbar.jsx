import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import { lazy } from "react";

const Navbar = ({ user }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    const logoutElement = document.querySelector("#logout");

    if (user && logoutElement) {
      const handleMouseOver = () => setShow(true);
      const handleMouseLeave = () => setShow(false);

      logoutElement.addEventListener("mouseover", handleMouseOver);
      logoutElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        logoutElement.removeEventListener("mouseover", handleMouseOver);
        logoutElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [user]);

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
          {show && (
            <div className="absolute top-1 right-6 bg-white text-black px-2 py-1 border border-gray-700 rounded">
              Logout
            </div>
          )}
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
