import React from "react";
import java from "../assets/java.svg";
import cpp from "../assets/cpp.svg";
import python from "../assets/python.svg";
import c from "../assets/c.svg";
import javascript from "../assets/javascript.svg";
import typescript from "../assets/typescript.svg";
import golang from "../assets/golang.svg";
import { useNavigate } from "react-router-dom";

const Project = ({
  img,
  title,
  version,
  date,
  projLanguage,
  projectId,
  onDelete,
}) => {
  const navigate = useNavigate();
  const selectImg = (projLanguage) => {
    if (projLanguage === "java")
      return <img width={100} src={java} alt="Java" />;
    else if (projLanguage === "c++")
      return <img width={100} src={cpp} alt="C++" />;
    else if (projLanguage === "python")
      return <img width={100} src={python} alt="C++" />;
    else if (projLanguage === "c") return <img width={100} src={c} alt="C++" />;
    else if (projLanguage === "javascript")
      return <img width={100} src={javascript} alt="C++" />;
    else if (projLanguage === "typescript")
      return <img width={100} src={typescript} alt="C++" />;
    else if (projLanguage === "go")
      return <img width={100} src={golang} alt="C++" />;
  };

  return (
    <div className="flex items-center flex-col md:flex-row justify-between bg-slate-100 px-4 py-3 rounded">
      <div className="py-2 bg-slate-700 rounded p-1 ">
        {selectImg(projLanguage)}
      </div>
      <div className="w-full  md:overflow-scroll md:text-left text-center md:px-8 px-5 py-4 flex flex-col gap-1">
        <h4 className="lg:text-xl text-lg font-medium tracking-wide break-words">
          {title}
        </h4>
        <p className="text-xs text-slate-400">Version : {version}</p>
        <p className="text-xs text-slate-400 [word-spacing:2px]">
          Created on {date}
        </p>
      </div>
      <div className="flex md:flex-col md:gap-2 gap-10">
        <button
          onClick={() => navigate("/editor/" + projectId)}
          className="lg:px-6 px-4 lg:py-2 py-1.5 tracking-wide bg-black text-white rounded"
        >
          Open
        </button>
        <button
          onClick={() => onDelete(projectId)}
          className="md:px-6 px-4 md:py-2 py-1.5 tracking-wide bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Project;
