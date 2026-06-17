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

router.delete("/:id", async (req, res) => {
  try {
    await analysisHistoryModel.deleteHistory(
      req.params.id
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