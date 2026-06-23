const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");
const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  analysisController.analyzeRole
);

module.exports = router;