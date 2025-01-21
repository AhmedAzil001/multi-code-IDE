import React, { useEffect } from "react";
import {createProject} from "../helper";

const ProjectModal = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center backdrop-blur-sm bg-black/20">
      <form
        onSubmit={createProject}
        className="bg-white px-7 py-4 flex flex-col gap-4 rounded"
      >
        <h2 className="text-2xl font-medium">Create a project</h2>
        <div className="h-[0.1rem] bg-gray-600"></div>
        <Input
          label={"Name of the project"}
          placeholder={"Ex:- My Java project"}
          type={"text"}
          name={"title"}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium px-1">Choose language</div>
          <select
            name="language"
            id=""
            className="px-4 py-3 border rounded outline-none cursor-pointer"
            onChange={handleLanguageSelect}
            value={languageCategory[0].langauge}
          >
            {languageCategory.map((language) => (
              <option value={language.label} key={language.label}>
                {`${language.language[0].toUpperCase()}${language.language.slice(
                  1
                )}`}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectModal;
