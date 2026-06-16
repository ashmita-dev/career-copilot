const skillModel = require("../models/skillModel");

const getSkills = async (req, res) => {
  try {
    const skills = await skillModel.getAllSkills();

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSkills,
};