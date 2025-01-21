import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../helper";
import Editor2 from "@monaco-editor/react";
import play from "../assets/play-fill.svg";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const editorRef = useRef(null);

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
      setProject(response.data.project);
      setCode(response.data.project.code);
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch project");
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    console.log("Editor Mounted:", editor); // Debugging log
  };

  const handleIndentation = () => {
    if (editorRef.current) {
      const formatAction = editorRef.current.getAction(
        "editor.action.formatDocument"
      );
      if (formatAction) {
        formatAction.run();
        console.log("Code formatted successfully!"); // Debugging log
      } else {
        console.error("Format action not available for the current language.");
        toast.error("Code formatting is not supported for this language.");
      }
    } else {
      console.error("Editor instance not found.");
      toast.error("Editor is not ready.");
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return (
    <>
      <div className="px-10 py-3.5 flex items-center justify-between bg-black text-white">
        <button
          onClick={runProject}
          className="px-4 py-2 rounded flex gap-1 text-lg items-center bg-green-600 mx-auto"
        >
          Run <img src={play} alt="Run" width={25} />
        </button>
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
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="right w-[40%] h-[90vh] bg-black text-white">
          <div className="py-2 px-3 text-lg font-semibold bg-slate-950 border-b">
            Output :
          </div>
          <div className={`px-4 py-3 ${error ? "text-red-600" : "text-white"}`}>
            {output}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
