const express = require("express");
const router = express.Router();

const roleSkillController = require("../controllers/roleSkillController");

router.get("/:roleId", roleSkillController.getRoleSkills);

module.exports = router;