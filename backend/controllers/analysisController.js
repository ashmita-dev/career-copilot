const roleSkillModel = require("../models/roleSkillModel");
const { analyzeSkills } = require("../utils/analysisUtil");

const analyzeRole = async (req, res) => {
  try {
    const { roleId, userSkills } = req.body;

    const requiredSkills =
      await roleSkillModel.getSkillsByRole(roleId);

    const formattedUserSkills =
      userSkills.map(skill => ({
        skill_name: skill,
      }));

    const analysis = analyzeSkills(
      requiredSkills,
      formattedUserSkills
    );

    res.status(200).json(analysis);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeRole,
};