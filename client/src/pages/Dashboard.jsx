import React, { useEffect, useState, version } from "react";
import Project from "../components/Project";
import axios from "axios";
import { base_url } from "../helper";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [projects, setProjects] = useState(null);
  const [languageCategory, setLanguageCategory] = useState([]);
  // const projects = [
  //   {
  //     id: 1,
  //     title: "MY PROJECT",
  //     projLanguage: "Java",
  //     version: "23.25.01",
  //     date: "26/02/2025",
  //   },
  //   {
  //     id: 2,
  //     title: "MY PROJECT",
  //     projLanguage: "C++",
  //     version: "23.25.01",
  //     date: "26/02/2025",
  //   },
  //   {
  //     id: 3,
  //     title: "MY PROJECT",
  //     projLanguage: "Python",
  //     version: "23.25.01",
  //     date: "26/02/2025",
  //   },
  //   {
  //     id: 4,
  //     title: "MY PROJECT",
  //     projLanguage: "C",
  //     version: "23.25.01",
  //     date: "26/02/2025",
  //   },
  // ];

  const getRuntime = async () => {
    const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
    const data = response.data;
    const languages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash",
      "go",
    ];

    const filteredLanguages = data
      .filter((runtime) => languages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        version: runtime.version,
        language: runtime.language === "c++" ? "cpp" : runtime.language,
      }));
    setLanguageCategory(filteredLanguages);
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(
        base_url + "/api/v1/project/get-projects",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getRuntime();
    getProjects();
  }, []);

  return (
    <div className="px-20 py-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-medium tracking-wide [word-spacing:2px]">
          All Projects
        </h1>
        <button className="px-4 py-2 bg-black text-white rounded [word-spacing:2px]">
          Create Project
        </button>
      </div>

      {projects && projects.length > 0 ? (
        <div className="flex flex-col gap-6">
          {projects.map((data) => (
            <Project
              key={data.id}
              title={data.title}
              version={data.version}
              date={data.date}
              projLanguage={data.projLanguage}
            />
          ))}
        </div>
      ) : (
        <div>You don't have any projects! Create one </div>
      )}
    </div>
  );
};

export default Dashboard;
