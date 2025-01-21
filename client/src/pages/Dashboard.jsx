import React, { useEffect, useRef, useState, version } from "react";
import Project from "../components/Project";
import axios from "axios";
import { base_url } from "../helper";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import left from "../assets/left.svg";
import right from "../assets/right-black.svg";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [languageCategory, setLanguageCategory] = useState([]);
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    langauge: "python",
    version: "",
  });
  const [projectName, setProjectName] = useState("");
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(base_url + "/api/v1/user/me", {
        headers: { token: localStorage.getItem("token") },
      });
      const data = response.data?.user;
      setUser(data);
      console.log(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const getRuntime = async () => {
    const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
    const data = response.data;
    const languages = ["python", "javascript", "c", "c++", "java", "go"];
    const filteredLanguages = data
      .filter((runtime) => languages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        version: runtime.version,
        language: runtime.language === "c++" ? "cpp" : runtime.language,
      }));
    const finalLanguage = filteredLanguages.filter(
      (lang) => lang.version !== "1.32.3"
    );
    setLanguageCategory(finalLanguage.reverse());
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
      console.log(response.data);
      setProjects((prev) => response.data.projects);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleLanguageSelect = (e) => {
    const value = e.target.value;
    const version = value
      .slice(value.indexOf("(") + 1, value.length - 1)
      .trim();
    const langauge = value.slice(0, value.indexOf("(")).trim();
    console.log(version, langauge);
    setSelectedLanguage((prev) => ({
      ...prev,
      langauge: langauge,
      version: version,
    }));
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        base_url + "/api/v1/project/create-project",
        {
          name: projectName,
          projLanguage: selectedLanguage.langauge,
          version: selectedLanguage.version,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      console.log(data);
      setOpenCreateProjectModal(false);
      navigate("/editor/" + data.project._id);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await axios.post(
        base_url + "/api/v1/project/delete-project",
        {
          projectId: id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      getProjects();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUser();
    getRuntime();
    getProjects();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenCreateProjectModal(false);
      }
    };
    if (openCreateProjectModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openCreateProjectModal]);

  return (
    <>
      <Navbar user={user} />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-20 py-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-medium tracking-wide [word-spacing:2px]">
              Hi, {user.name}
            </h1>
            <button
              onClick={() => setOpenCreateProjectModal(true)}
              className="px-4 py-2 bg-black text-white rounded [word-spacing:2px]"
            >
              Create Project
            </button>
          </div>

          {/* Project mapping */}
          <div className="flex flex-col gap-6 px-10">
            {projects.length > 0 ? (
              projects
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((data) => (
                  <Project
                    key={data._id}
                    title={data.name}
                    version={data.version}
                    date={data.date}
                    projLanguage={data.projLanguage}
                    projectId={data._id}
                    onDelete={deleteProject}
                  />
                ))
            ) : (
              <div>You don't have any projects! Create one </div>
            )}
          </div>

          {/* Create project modal */}
          {openCreateProjectModal && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center backdrop-blur-sm bg-black/20">
              <form
                ref={modalRef}
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
                  <div className="text-sm font-medium px-1">
                    Choose language
                  </div>
                  <select
                    name="language"
                    id=""
                    className="px-4 py-3 border rounded outline-none cursor-pointer"
                    onChange={handleLanguageSelect}
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

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Create Project
                </button>
              </form>
            </div>
          )}

          {/* pagination */}
          {projects.length > 3 && (
            <div className="flex gap-2 items-center py-6 justify-center">
              <img
                src={left}
                alt=""
                className="cursor-pointer"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
              {Array.from({ length: Math.ceil(projects.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 ${currentPage === index + 1 ? "bg-black text-white" : ""} border border-black rounded`}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <img
                src={right}
                alt=""
                className="cursor-pointer"
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(projects.length / 3))
                  )
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
