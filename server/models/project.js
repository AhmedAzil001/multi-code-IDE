const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projLang: {
    type: String,
    required: true,
    enum: ["python", "java", "javascript", "cpp", "c", "go", "bash"],
  },
  code: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: String,
    required: true,
  },
});

const ProjectModel = mongoose.model("project", projectSchema);

module, (exports = ProjectModel);
