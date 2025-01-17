import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center py-4 md:px-20 px-3 justify-between bg-slate-900 text-white">
      <Link to={"/"}>
        <p className="font-semibold md:text-2xl text-lg tracking-wider">
          CodeEngine
        </p>
      </Link>
      <Link
        className="md:px-6 px-4 md:py-1.5 py-1 bg-white text-black rounded text-[1.1rem]"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
};

export default Navbar;
