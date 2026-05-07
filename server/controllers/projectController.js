const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {

  try {

    const { title, description, teamMembers } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Project title is required",
      });
    }

    const project = await Project.create({
      title,
      description,
      teamMembers: teamMembers || [],
      createdBy: req.user.id,
    });

    const populatedProject = await Project.findById(project._id)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");

    res.status(201).json(populatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// GET ALL PROJECTS
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createProject,
  getProjects,
};