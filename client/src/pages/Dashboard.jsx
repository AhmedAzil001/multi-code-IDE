import React from "react";
import Project from "../components/Project";

const Dashboard = () => {
  const projects = [
    {
      id: 1,
      title: "MY PROJECT",
      projLanguage: "Java",
      version: "23.25.01",
      date: "26/02/2025",
    },
    {
      id: 2,
      title: "MY PROJECT",
      projLanguage: "C++",
      version: "23.25.01",
      date: "26/02/2025",
    },
    {
      id: 2,
      title: "MY PROJECT",
      projLanguage: "Python",
      version: "23.25.01",
      date: "26/02/2025",
    },
    {
      id: 2,
      title: "MY PROJECT",
      projLanguage: "C",
      version: "23.25.01",
      date: "26/02/2025",
    },
  ];

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

      <div className="flex flex-col gap-6">
        {projects.map((data, idx) => (
          <Project
            key={data.id}
            title={data.title}
            version={data.version}
            date={data.date}
            projLanguage={data.projLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
