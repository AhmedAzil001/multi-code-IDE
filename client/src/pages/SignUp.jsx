import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import email from "../assets/person-fill.svg";
import lock from "../assets/lock-fill.svg";
import person from "../assets/envelope-fill.svg";
import axios from "axios";
import { base_url } from "../helper";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(base_url + "/api/v1/user/signup", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      const { token, success } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", success);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form
        action=""
        className="md:w-[25%] px-6 py-4 bg-white rounded-lg flex flex-col gap-2"
        onSubmit={handleFromSubmit}
      >
        <h4 className="text-center text-2xl font-semibold mb-4">
          Welcome to CodeEngine
        </h4>
        <Input
          type={"text"}
          placeholder={"Jane Doe"}
          img={email}
          label={"Full Name"}
          onChange={handleChange}
          name={"fullName"}
        />
        <Input
          type={"email"}
          placeholder={"example@gmail.com"}
          img={person}
          label={"Email"}
          onChange={handleChange}
          name={"email"}
        />
        <Input
          type={"password"}
          placeholder={"*********"}
          img={lock}
          label={"Password"}
          onChange={handleChange}
          name={"password"}
        />
        <span className="text-sm px-1 tracking-wider text-gray-800">
          Forgot Password?
        </span>
        <button
          type="submit"
          className="w-full px-4 py-2 my-2 flex items-center justify-center bg-black text-white rounded"
        >
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
