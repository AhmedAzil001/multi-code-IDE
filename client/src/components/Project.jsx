import React from "react";
import java from "../assets/java.svg";
import cpp from "../assets/cpp.svg";
import python from "../assets/python.svg";
import c from "../assets/c.svg";

const Project = ({ img, title, version, date, projLanguage }) => {
  const selectImg = (projLanguage) => {
    if (projLanguage === "Java")
      return <img width={100} src={java} alt="Java" />;
    else if (projLanguage === "C++")
      return <img width={100} src={cpp} alt="C++" />;
    else if (projLanguage === "Python")
      return <img width={100} src={python} alt="C++" />;
    else if (projLanguage === "C")
      return <img width={100} src={c} alt="C++" />;
  };
  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded cursor-pointer">
      <div className="py-2 bg-slate-700 rounded p-1">
        {selectImg(projLanguage)}
      </div>
      <div className="w-full text-left px-8 py-4 flex flex-col gap-1">
        <h4 className="text-xl font-medium tracking-wide">{title}</h4>
        <p className="text-xs text-slate-400">Version : {version}</p>
        <p className="text-xs text-slate-400 [word-spacing:2px]">
          Created on {date}
        </p>
      </div>
      <button className="px-6 py-2 tracking-wide bg-red-500 text-white rounded">
        Edit
      </button>
    </div>
  );
};

export default Project;
