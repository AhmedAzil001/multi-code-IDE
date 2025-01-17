import React, { useState } from "react";
import email from "../assets/envelope-fill.svg";
import lock from "../assets/lock-fill.svg";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form
        action=""
        className="w-[25%] px-6 py-4 bg-white rounded-lg flex flex-col gap-1"
        onSubmit={handleFormSubmit}
      >
        <h4 className="text-center text-2xl font-semibold mb-4">
          Enter your credentials
        </h4>
        <Input
          type={"email"}
          placeholder={"example@gmail.com"}
          img={email}
          label={"Email"}
          name={"email"}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          placeholder={"*********"}
          img={lock}
          label={"Password"}
          name={"password"}
          onChange={handleChange}
        />
        <span className="text-sm px-1 tracking-wider text-gray-800">
          Forgot Password?
        </span>
        <button type="submit" className="w-full px-4 py-2 my-2 flex items-center justify-center bg-black text-white rounded">
          Login
        </button>
        <div className="flex items-center gap-2 px-1">
          <p className="text-gray-800 text-sm">Don't have an account?</p>
          <Link to={"/signup"} className="text-gray-800 text-sm font-medium">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
