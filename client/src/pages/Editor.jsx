import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../helper";
import Editor2 from "@monaco-editor/react";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const getProject = async () => {
    try {
      const response = await axios.post(
        base_url + "/api/v1/project/get-project",
        { projectId: id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.project);
      setProject(response.data.project);
      setCode(response.data.project.code);
    } catch (error) {
      toast.error(error.response?.data?.message);
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
    console.log(data);
    setOutput(data.run.output);
    setError(data.run.code === 1 ? true : false);
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="left flex gap-5 justify-between">
      <div className="w-[50%] h-[80vh]">
        <h1>{}</h1>
        <Editor2
          theme="vs-dark"
          height="100%"
          width="100%"
          value={code}
          onChange={(newCode) => {
            console.log("New Code:", newCode); // Debug: Log changes
            setCode(newCode || ""); // Update state
          }}
        />
      </div>
      <div className="right p-[15px] w-[50%] h-[90vh] bg-[#27272a]">
        <button onClick={runProject} className="px-4 py-2 bg-red-700 rounded">
          Run
        </button>
        <div>{output}</div>
      </div>
    </div>
  );
};

export default Editor;
