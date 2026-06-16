const careerGoalModel = require(
  "../models/careerGoalModel"
);

const createGoal = async (
  req,
  res
) => {
  try {
    const {
      roleId,
      targetScore,
    } = req.body;

    const goal =
      await careerGoalModel.createGoal(
        roleId,
        targetScore
      );

    res.status(201).json(goal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getGoals = async (
  req,
  res
) => {
  try {
    const goals =
      await careerGoalModel.getGoals();

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
};