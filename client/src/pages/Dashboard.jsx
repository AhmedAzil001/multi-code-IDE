import React, { useEffect, useRef, useState } from "react";
import Project from "../components/Project";
import axios from "axios";
import { base_url } from "../helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import left from "../assets/left.svg";
import right from "../assets/right-black.svg";
import moment from "moment";
import { debounce } from "lodash";

const Dashboard = () => {
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState({
    langauge: "python",
    version: "3.10.0",
  });
  const [dashboardData, setDashboardData] = useState({
    user: {},
    projects: [],
    languageCategory: [],
    loading: true,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [userRes, runtimeRes, projectsRes] = await Promise.all([
        axios.get(base_url + "/api/v1/user/me", {
          headers: { token: localStorage.getItem("token") },
        }),
        axios.get("https://emkc.org/api/v2/piston/runtimes"),
        axios.get(base_url + "/api/v1/project/get-projects", {
          headers: { token: localStorage.getItem("token") },
        }),
      ]);

      // Process runtime data
      const data = runtimeRes.data;
      const languages = ["python", "javascript", "c", "java", "go"];
      const filteredLanguages = data
        .filter((runtime) => languages.includes(runtime.language))
        .map((runtime) => ({
          label: `${runtime.language} (${runtime.version})`,
          version: runtime.version,
          language: runtime.language,
        }))
        .filter((lang) => lang.version !== "1.32.3")
        .reverse();

      setDashboardData({
        user: userRes.data?.user,
        projects: projectsRes.data.projects,
        languageCategory: filteredLanguages,
        loading: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      // console.log(data);
      setOpenCreateProjectModal(false);
      navigate("/editor/" + data.project._id);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true }));
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
      fetchData();
      setCurrentPage(1);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenCreateProjectModal(false);
      }
    };
    if (openCreateProjectModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openCreateProjectModal]);

  return (
    <>
      <Navbar user={dashboardData.user} />
      {dashboardData.loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="h-[85vh] md:px-20 px-5 py-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="md:text-2xl text-lg font-medium tracking-wide [word-spacing:2px]">
              Hi, {dashboardData.user.name}
            </h1>
            <button
              onClick={() => setOpenCreateProjectModal(true)}
              className="md:px-4 px-3 md:py-2 py-1 bg-black text-white rounded [word-spacing:2px]"
            >
              Create Project
            </button>
          </div>

          {/* Project mapping */}
          <div className="flex flex-col gap-6 md:px-10 px-1">
            {dashboardData.projects?.length > 0 ? (
              dashboardData.projects
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((data) => (
                  <Project
                    key={data._id}
                    title={data.name}
                    version={data.version}
                    date={moment(data.date).format("ll")}
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
                className="bg-white px-7 py-4 flex flex-col gap-4 rounded md:w-[25%] w-[85%]"
              >
                <h2 className="text-2xl font-medium">Create a project</h2>
                <div className="h-[0.1rem] bg-gray-600"></div>
                <input
                  className="px-4 py-3 outline-none  w-full border rounded"
                  type="text"
                  label={"Name of the project"}
                  placeholder={"Ex:- My Java project"}
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
                    {dashboardData.languageCategory.map((language) => (
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
          {dashboardData.projects?.length > 3 && (
            <div className="flex gap-2 items-center py-6 justify-center">
              <img
                src={left}
                alt=""
                className="cursor-pointer"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
              {Array.from({
                length: Math.ceil(dashboardData.projects.length / 3),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 ${currentPage === index + 1 ? "bg-black text-white" : ""} border border-black rounded`}
                >
                  {index + 1}
                </button>
              ))}
              <img
                src={right}
                alt=""
                className="cursor-pointer"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(dashboardData.projects.length / 3)
                    )
                  )
                }
              />
            </div>
          )}
        </div>
      )}
      {/* <Footer/> */}
    </>
  );
};

export default Dashboard;
