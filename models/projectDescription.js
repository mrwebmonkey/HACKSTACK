// models/ProjectDescription.js
const mongoose = require('mongoose');

const ProjectDescriptionSchema = new mongoose.Schema({
  tools: [String],
  difficulty: {
    type: String,
    enum: ['Easy', 'Intermediate', 'Hard'],
    required: true
  },
  estimate_time: String,
  file_structure: String,
  scope: String,
  code: String,
  count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const ProjectDescription = mongoose.model('ProjectDescription', ProjectDescriptionSchema);

module.exports = ProjectDescription;

