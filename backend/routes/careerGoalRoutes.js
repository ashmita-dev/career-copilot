const express = require("express");

const router =
  express.Router();

const {
  createGoal,
  getGoals,
  deleteGoal,
} = require(
  "../controllers/careerGoalController"
);

router.post(
  "/",
  createGoal
);

router.get(
  "/",
  getGoals
);

router.delete(
  "/:id",
  deleteGoal
);

module.exports = router;