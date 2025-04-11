// models/Category.js
const mongoose = require('mongoose');

const ProjectMetaSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectDescription',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
}, { _id: false });

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image_link: String,
  projects_number: {
    type: Number,
    default: 0
  },
  projects: [ProjectMetaSchema],
  slug: String
}, { timestamps: true });


CategorySchema.methods.addProject = async function (projectDoc) {
  this.projects.push({
    projectId: projectDoc._id,
    title: projectDoc.title || "Untitled Project",
    description: projectDoc.description || ""
  });
  this.projects_number = this.projects.length;
  await this.save();
};

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
