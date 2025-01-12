const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  projLanguage: {
    type: String,
    required: true,
    enum: ["python", "java", "javascript", "cpp", "c", "go", "bash"],
  },
  code: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
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

module.exports = ProjectModel;
