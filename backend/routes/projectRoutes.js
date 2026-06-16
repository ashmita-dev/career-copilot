const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

router.get("/:roleId", projectController.getProjects);

module.exports = router;