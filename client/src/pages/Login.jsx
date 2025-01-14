import React from "react";

const Login = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form action="" className="w-[25%] px-6 py-4 bg-white rounded-lg">
        <h4 className="text-center text-2xl font-semibold mb-4">Enter your credentials</h4>
        <div className="w-full bg-black p-2">
          <input className="px-4 py-2 outline-none" type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <span>Forgot Password</span>
        <button>Login</button>
        <div>
          <p>Don't have an account?</p>
          <span>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
