import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import email from "../assets/person-fill.svg";
import lock from "../assets/lock-fill.svg";
import person from "../assets/envelope-fill.svg";

const SignUp = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form
        action=""
        className="w-[25%] px-6 py-4 bg-white rounded-lg flex flex-col gap-2"
      >
        <h4 className="text-center text-2xl font-semibold mb-4">
          Welcome to CodEngine
        </h4>
        <Input type={"text"} placeholder={"Jane Doe"} img={email} label={'Full Name'}/>
        <Input type={"email"} placeholder={"example@gmail.com"} img={person} label={'Email'}/>
        <Input type={"password"} placeholder={"*********"} img={lock} label={'Password'}/>
        <span className="text-sm px-1 tracking-wider text-gray-800">
          Forgot Password?
        </span>
        <button className="w-full px-4 py-2 my-2 flex items-center justify-center bg-black text-white rounded">
          Sign Up
        </button>
        <div className="flex items-center gap-2 px-1">
          <p className="text-gray-800 text-sm">Don't have an account?</p>
          <Link to={"/login"} className="text-gray-800 text-sm font-medium">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
