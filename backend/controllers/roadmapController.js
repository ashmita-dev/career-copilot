const roadmapModel = require("../models/roadmapModel");

const getRoadmap = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const roadmap = await roadmapModel.getRoadmapByRole(roleId);

    res.status(200).json(roadmap);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRoadmap,
};