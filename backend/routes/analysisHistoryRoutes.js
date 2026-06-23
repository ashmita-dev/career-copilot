const express = require("express");

const router = express.Router();

const analysisHistoryModel = require(
  "../models/analysisHistoryModel"
);

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    const userId =
  req.user.userId;
  try {
    const history =
  await analysisHistoryModel.getAnalysisHistory(
    userId
  );

    res.status(200).json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
  try {
    const userId =
  req.user.userId;

await analysisHistoryModel.deleteHistory(
  req.params.id,
  userId
);

    res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;