const { Router } = require("express");
const {
  createProject,
  saveProject,
  getProjects,
  getProject,
  editProject,
  deleteProject,
} = require("../controllers/project.controller");
const auth = require("../middleware/user.middleware");

const projectRouter = Router();

projectRouter.post("/create-project", auth, createProject);
projectRouter.put("/save-project", auth, saveProject);
projectRouter.get("/get-projects", auth, getProjects);
projectRouter.get("/get-project", auth, getProject);
projectRouter.put("/edit-project", auth, editProject);
projectRouter.delete("/delete-project", auth, deleteProject);

module.exports = projectRouter;
