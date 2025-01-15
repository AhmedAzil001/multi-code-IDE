import React from "react";
import person from "../assets/person-fill.svg";
import lock from "../assets/lock-fill.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form
        action=""
        className="w-[25%] px-6 py-4 bg-white rounded-lg flex flex-col gap-2"
      >
        <h4 className="text-center text-2xl font-semibold mb-4">
          Enter your credentials
        </h4>
        <div className="w-full py-1 px-4 flex items-center bg-neutral-100 rounded-md">
          <img src={person} alt="" />
          <input
            className="px-4 py-2 outline-none bg-neutral-100"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="w-full py-1 px-4 flex items-center bg-neutral-100 rounded-md">
          <img src={lock} alt="" />
          <input
            className="px-4 py-2 outline-none bg-neutral-100"
            type="password"
            placeholder="Password"
          />
        </div>
        <span className="text-sm px-1 tracking-wider text-gray-800">
          Forgot Password?
        </span>
        <button className="w-full px-4 py-2 my-2 flex items-center justify-center bg-black text-white rounded">
          Login
        </button>
        <div className="flex items-center gap-2 px-1">
          <p className="text-gray-800 text-sm">Don't have an account?</p>
          <Link to={'/signup'} className="text-gray-800 text-sm font-medium">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
