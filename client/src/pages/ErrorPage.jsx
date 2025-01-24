import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <div className="md:w-[30%]  flex gap-2 flex-col py-2 px-4 items-center">
        <h1 className="text-7xl font-bold  tracking-wider">404</h1>
        <p className="text-xl py-3 text-gray-800">Oops, Page not found!</p>
        <p className="text-gray-500 font-light">
          Sorry, the page you are looking for does not exists.
        </p>
        <Link to={"/"} className="px-4 py-2 bg-black text-white rounded mt-4">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
