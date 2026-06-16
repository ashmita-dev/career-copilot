const express = require("express");
const router = express.Router();

const roadmapController = require("../controllers/roadmapController");

router.get("/:roleId", roadmapController.getRoadmap);

module.exports = router;