const roadmapModel = require(
  "../models/roadmapModel"
);

const roadmapHistoryModel = require(
  "../models/roadmapHistoryModel"
);

const getRoadmap = async (
  req,
  res
) => {
  try {

    const roleId =
      req.params.roleId;

    const userId =
      req.user.userId;

    console.log(
      "ROLE ID:",
      roleId
    );

    console.log(
      "USER ID:",
      userId
    );

    const roadmap =
      await roadmapModel.getRoadmapByRole(
        roleId
      );

    await roadmapHistoryModel.saveRoadmapHistory(
      userId,
      roleId
    );

    console.log(
      "Roadmap history saved"
    );

    res.status(200).json(
      roadmap
    );

  } catch (error) {

    console.error(
      "ROADMAP ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRoadmap,
};