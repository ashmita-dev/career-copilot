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

    const userId =
      req.user.userId;

    const goal =
      await careerGoalModel.createGoal(
        roleId,
        targetScore,
        userId
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
    const userId =
      req.user.userId;

    const goals =
      await careerGoalModel.getGoals(
        userId
      );

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGoal = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const userId =
      req.user.userId;

    const deletedGoal =
      await careerGoalModel.deleteGoal(
        id,
        userId
      );

    res.status(200).json(
      deletedGoal
    );
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
  deleteGoal,
};