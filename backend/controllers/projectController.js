const projectModel = require("../models/projectModel");

const getProjects = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const projects = await projectModel.getProjectsByRole(roleId);

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
};