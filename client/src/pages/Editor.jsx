import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url, beautifyCode } from "../helper";
import Editor2 from "@monaco-editor/react";
import play from "../assets/play-fill.svg";
import editIcon from "../assets/edit.svg";

const Editor = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);

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
      const projectData = response.data.project;
      setProject(projectData);
      setProjectName(projectData.name);
      const beautifiedCode = beautifyCode(
        projectData.code,
        projectData.projLanguage
      );
      setCode(beautifiedCode);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch project");
    }
  };

  const extensions = {
    python: ".py",
    java: ".java",
    javascript: ".js",
    c: ".c",
    cpp: ".cpp",
  };

  const runProject = async () => {
    const filename = project.name + (extensions[project.projLanguage] || "");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: project.projLanguage,
          version: project.version,
          files: [{ filename, content: code }],
        }
      );
      const data = response.data;
      setOutput(data.run.output);
    } catch (error) {
      setOutput("Failed to run the project");
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    try {
      await axios.put(
        `${base_url}/api/v1/project/save-project`,
        { projectId: id, code: code },
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success("Project saved successfully", { autoClose: 2000 });
      getProject();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save project");
    }
  };

  const editProject = async () => {
    if (projectName.trim() === project.name) {
      setEdit(false);
      return;
    }
    try {
      await axios.put(
        `${base_url}/api/v1/project/edit-project`,
        { projectId: id, name: projectName },
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success("Project name changed successfully", { autoClose: 2000 });
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
    if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
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
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          {isEdit ? (
            <>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-gray-700 text-white px-2 py-1 rounded outline-none border border-gray-600"
              />
              <button
                onClick={editProject}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{projectName}</span>
              <img
                src={editIcon}
                alt="Edit"
                className="cursor-pointer w-5"
                onClick={() => setEdit(true)}
              />
            </div>
          )}
        </div>
        <button
          onClick={runProject}
          className="flex items-center gap-2 font-medium bg-green-600 px-4 py-2 rounded"
        >
          Run <img src={play} alt="Run" className="w-5" />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-1">
        {/* Editor Section */}
        <div className="w-1/2 h-full border-r border-gray-700">
          <Editor2
            theme="vs-dark"
            height="100%"
            language={project?.projLanguage}
            value={code}
            onChange={(newCode) => setCode(newCode || "")}
          />
        </div>

        {/* Output Section */}
        <div className="w-1/2 h-full bg-gray-800">
          <div className="p-4 border-b border-gray-700 text-lg font-semibold">
            Output
          </div>
          <div className="p-4 overflow-auto">
            {loading ? (
              <div className="text-center animate-pulse text-gray-400">
                Running code...
              </div>
            ) : (
              <pre
                className={`whitespace-pre-wrap ${
                  output.includes("error") ? "text-red-500" : "text-green-500"
                }`}
              >
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
