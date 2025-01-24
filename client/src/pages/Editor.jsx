import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url, beautifyCode } from "../helper";
import play from "../assets/play-fill.svg";
import editIcon from "../assets/edit.svg";
import { debounce } from "lodash";
import moment from "moment";
const MonacoEditor = lazy(() => import("@monaco-editor/react"));

const Editor = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveWait, setSaveWait] = useState(false);

  const getProject = useCallback(async () => {
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
      setSaveWait(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch project");
    }
  }, [id]);

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
      saveProject();
      const data = response.data;
      setOutput(data.run.output);
    } catch (error) {
      setOutput("Failed to run the project");
    } finally {
      setLoading(false);
    }
  };

  const saveProject = debounce(async () => {
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
  }, 500);

  const editProject = debounce(async () => {
    if (projectName.trim() === project.name) {
      setEdit(false);
      return;
    }
    try {
      setSaveWait(true);
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
  }, 500);

  useEffect(() => {
    getProject();
  }, [id]);

  const handleSaveShortcut = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveProject();
      }
    },
    [code]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [handleSaveShortcut]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center md:px-6 px-2 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 md:gap-4">
          {isEdit ? (
            <>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-gray-700 text-white px-2 py-1 md:w-[20rem] w-[10rem] rounded outline-none border border-gray-600"
              />
              <button
                onClick={editProject}
                className="bg-green-600 px-3 py-1 rounded flex gap-1 items-center"
              >
                {saveWait && (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
                )}{" "}
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
              <input
                type="text"
                value={projectName}
                className="md:text-xl w-[10rem] md:w-[16rem] text-base font-semibold overflow-scroll bg-gray-800 outline-none"
                readOnly
              />
              <img
                src={editIcon}
                alt="Edit"
                className="cursor-pointer w-5"
                onClick={() => setEdit(true)}
              />
            </div>
          )}
        </div>
        {!isEdit && (
          <button
            onClick={runProject}
            className="flex items-center gap-2 font-medium bg-green-600 md:px-4 px-2.5 md:py-2 py-1.5 rounded"
          >
            Run <img src={play} alt="Run" className="w-5" />
          </button>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Editor Section */}
        <Suspense fallback={<div>Loading Editor...</div>}>
          <div className="md:w-1/2 h-full border-r border-gray-700">
            <MonacoEditor
              theme="vs-dark"
              height="100%"
              width="100%"
              language={project?.projLanguage}
              value={code}
              onChange={(newCode) => setCode(newCode || "")}
            />
          </div>
        </Suspense>
        {/* Output Section */}
        <div className="md:w-1/2 h-full bg-gray-800">
          <div className="p-4 border-b border-gray-700 text-lg font-semibold">
            Output {`(Ctrl + s to save project)`}
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
