const ProjectModel = require("../models/project");

function getStartupCode(language) {
  if (language.toLowerCase() === "python") {
    return 'print("Hello World")';
  } else if (language.toLowerCase() === "java") {
    return 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }';
  } else if (language.toLowerCase() === "javascript") {
    return 'console.log("Hello World");';
  } else if (language.toLowerCase() === "cpp") {
    return '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}';
  } else if (language.toLowerCase() === "c") {
    return '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
  } else if (language.toLowerCase() === "go") {
    return 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}';
  } else if (language.toLowerCase() === "bash") {
    return 'echo "Hello World"';
  } else {
    return "Language not supported";
  }
}

exports.createProject = async (req, res) => {
  const { name, projLanguage, version } = req.body;
  try {
    const project = await ProjectModel.findOne({ name: name });
    if (project)
      return res.status(401).json({
        success: false,
        message: "Project with this name already exixts",
      });
    const creatorId = req._id;
    const createdProject = await ProjectModel.create({
      name: name,
      projLanguage: projLanguage,
      code: getStartupCode(projLanguage),
      creatorId: creatorId,
      version: version,
    });
    return res.status(201).json({
      success: true,
      project: createdProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveProject = async (req, res) => {
  try {
    const { projectId, code } = req.body;

    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId },
      { code: code },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Project saved successfully",
      project: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const creatorId = req._id;
    const projects = await ProjectModel.find({ creatorId: creatorId });
    if (projects.length === 0)
      return res.status(200).json({
        success: true,
        message: "No projects at the moment",
      });
    return res.status(200).json({
      success: true,
      projects: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await ProjectModel.findOne({ _id: projectId });
    if (project) {
      return res.status(200).json({
        success: true,
        project: project,
        message: "Project fetched successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editProject = async (req, res) => {
  try {
    const { projectId, name } = req.body;
    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId },
      { name: name },
      { new: true, runValidators: true }
    );
    if (project) {
      return res.status(200).json({
        success: true,
        project: project,
        message: "Project updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await ProjectModel.findOneAndDelete({ _id: projectId });
    if (project) {
      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
