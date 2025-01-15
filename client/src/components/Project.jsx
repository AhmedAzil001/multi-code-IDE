import React from "react";

const Project = ({ img, title, version, date }) => {
  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded cursor-pointer">
      <div className="py-2 bg-slate-700 rounded p-1">
        <img width={100} src={img} alt="Java" />
      </div>
      <div className="w-full text-left px-8 py-4 flex flex-col gap-1">
        <h4 className="text-xl font-medium tracking-wide">
          {title}
        </h4>
        <p className="text-xs text-slate-400">Version : {version}</p>
        <p className="text-xs text-slate-400 [word-spacing:2px]">Created on {date}</p>
      </div>
      <button className="px-6 py-2 tracking-wide bg-red-500 text-white rounded">
        Edit
      </button>
    </div>
  );
};

export default Project;
