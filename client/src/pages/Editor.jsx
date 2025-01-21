import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url, beautifyCode } from "../helper";
import Editor2 from "@monaco-editor/react";
import play from "../assets/play-fill.svg";
import file from "../assets/file.svg";
import edit from "../assets/edit.svg";
import right from "../assets/right.svg";

const Editor = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const editorRef = useRef(null);
  const [isEdit, setEdit] = useState(false);
  const [projectName, setProjectName] = useState("");

  const getProject = async () => {
    try {
      const response = await axios.post(
        `${base_url}/api/v1/project/get-project`,
        { projectId: id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const project = response.data.project;
      setProject(project);
      const beautifiedCode = beautifyCode(project.code, project.projLanguage);
      console.log(beautifiedCode);
      setCode(beautifiedCode);
      setProjectName(project.name);
      console.log("got");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch project");
    }
  };

  const runProject = async () => {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: project.projLanguage,
        version: project.version,
        files: [
          {
            filename:
              project.name + project.projLanguage === "python"
                ? ".py"
                : project.projLanguage === "java"
                  ? ".java"
                  : project.projLanguage === "javascript"
                    ? ".js"
                    : project.projLanguage === "c"
                      ? ".c"
                      : project.projLanguage === "cpp"
                        ? ".cpp"
                        : project.projLanguage === "bash"
                          ? ".sh"
                          : "",
            content: code,
          },
        ],
      }
    );
    const data = response.data;
    setOutput(data.run.output);
    setError(data.run.code === 1 ? true : false);
  };

  const saveProject = async () => {
    try {
      const response = await axios.put(
        base_url + "/api/v1/project/save-project",
        { projectId: id, code: code },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);
      toast("Project saved successfully");
      getProject();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch project");
    }
  };

  const editProject = async () => {
    try {
      const response = await axios.put(
        base_url + "/api/v1/project/edit-project",
        { projectId: id, name: projectName },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);
      toast("Project name changed successfully");
      setEdit(false);
      getProject();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to edit project");
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveProject();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [code]);

  return (
    <>
      <div className="px-4 py-3.5 flex items-center justify-between bg-black text-white">
        <div className="flex items-center">
          <img src={right} alt="" width={20} />
          <img src={file} width={30} alt="" />
          <div className="bg-white text-black flex justify-between px-3 py-1.5 items-center rounded ml-4">
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="bg-white text-lg outline-none border-none"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                  onClick={editProject}
                  className="px-2 py-1 bg-green-600 rounded text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="ml-2 py-1 px-2 bg-black text-white rounded"
                >
                  X
                </button>
              </>
            ) : (
              <>
                <input
                  className="bg-white text-lg"
                  type="text"
                  value={projectName}
                  readOnly
                />
                <img
                  src={edit}
                  alt=""
                  className="cursor-pointer"
                  width={20}
                  onClick={() => setEdit(true)}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-[40%] flex justify-center">
          <button
            onClick={runProject}
            className="px-4 py-2 rounded flex gap-1 text-lg items-center bg-green-600"
          >
            Run <img src={play} alt="Run" width={25} />
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="left w-[60%] h-[90vh]">
          <Editor2
            theme="vs-dark"
            height="100%"
            width="100%"
            language={project?.projLanguage}
            value={code}
            onChange={(newCode) => {
              setCode(newCode || "");
            }}
          />
        </div>
        <div className="right w-[40%] h-[90vh] bg-slate-800 text-white">
          <div className="py-2 px-3 text-lg font-semibold  border-b text-center">
            Output
          </div>
          <pre className={`px-4 py-3 ${error ? "text-red-600" : "text-white"}`}>
            {output}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
