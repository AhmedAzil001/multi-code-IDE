import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center py-4 md:px-20 px-3 justify-between bg-slate-900 text-white">
      <Link to={"/"}>
        <p className="font-semibold md:text-2xl text-lg tracking-wider">
          MulTiCode
        </p>
      </Link>
      <Link
        className="px-6 py-1.5 bg-gradient-to-r from-violet-600 to-violet-700 rounded text-[1.1rem]"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
};

export default Navbar;
