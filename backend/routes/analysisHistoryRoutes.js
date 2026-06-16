const express = require("express");

const router = express.Router();

const analysisHistoryModel = require(
  "../models/analysisHistoryModel"
);

router.get("/", async (req, res) => {
  try {
    const history =
      await analysisHistoryModel.getAnalysisHistory();

    res.status(200).json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;