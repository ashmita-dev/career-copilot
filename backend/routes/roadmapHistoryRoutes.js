const express = require("express");

const router = express.Router();

const roadmapHistoryModel = require(
  "../models/roadmapHistoryModel"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const userId =
        req.user.userId;

      const history =
        await roadmapHistoryModel.getRoadmapHistory(
          userId
        );

      res.status(200).json(
        history
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;