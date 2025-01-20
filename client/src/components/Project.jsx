import React from "react";
import java from "../assets/java.svg";
import cpp from "../assets/cpp.svg";
import python from "../assets/python.svg";
import c from "../assets/c.svg";
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
    else if (projLanguage === "cpp")
      return <img width={100} src={cpp} alt="C++" />;
    else if (projLanguage === "python")
      return <img width={100} src={python} alt="C++" />;
    else if (projLanguage === "c") return <img width={100} src={c} alt="C++" />;
  };

  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded">
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
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/editor/" + projectId)}
          className="px-6 py-2 tracking-wide bg-black text-white rounded"
        >
          Open
        </button>
        <button
          onClick={() => onDelete(projectId)}
          className="px-6 py-2 tracking-wide bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Project;
