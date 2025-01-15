import React from "react";

const Input = ({ placeholder, type, img }) => {
  return (
    <div className="w-full py-1 px-4 flex items-center bg-neutral-100 rounded-md">
      <img src={img} alt="" />
      <input
        className="px-4 py-2 outline-none bg-neutral-100"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
