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

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  createGoal
);

router.get(
  "/",
  authMiddleware,
  getGoals
);

router.delete(
  "/:id",
  authMiddleware,
  deleteGoal
);

module.exports = router;