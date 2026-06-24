const roleSkillModel = require("../models/roleSkillModel");
const { analyzeSkills } = require("../utils/analysisUtil");
const analysisHistoryModel = require(
  "../models/analysisHistoryModel"
);

const roadmapHistoryModel = require(
  "../models/roadmapHistoryModel"
);

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

    const userId =
      req.user.userId;

    await analysisHistoryModel.saveAnalysis(
      roleId,
      analysis.matchPercentage,
      analysis.readinessLevel,
      analysis.learningTime,
      userId
    );

    await roadmapHistoryModel.saveRoadmapHistory(
      userId,
      roleId
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