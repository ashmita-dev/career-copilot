const pool = require("../config/db");

const getAllSkills = async () => {
  const result = await pool.query(
    "SELECT * FROM skills ORDER BY skill_name"
  );

  return result.rows;
};

module.exports = {
  getAllSkills,
};