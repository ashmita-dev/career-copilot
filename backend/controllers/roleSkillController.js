const roleSkillModel = require("../models/roleSkillModel");

const getRoleSkills = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const skills = await roleSkillModel.getSkillsByRole(roleId);

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRoleSkills,
};