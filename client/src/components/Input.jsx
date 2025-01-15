import React from "react";

const Input = ({ label, placeholder, type, img }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-left py-2">{label}</span>
      <div className="flex items-center w-full px-4 py-1 border rounded border-slate-200">
        <img src={img} alt="" />
        <input
          className="px-4 py-2 outline-none  w-full"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
