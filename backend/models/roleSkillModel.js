const pool = require("../config/db");

const getSkillsByRole = async (roleId) => {
  const result = await pool.query(
    `
    SELECT s.skill_name
    FROM role_skills rs
    JOIN skills s
      ON rs.skill_id = s.id
    WHERE rs.role_id = $1
    ORDER BY s.skill_name
    `,
    [roleId]
  );

  return result.rows;
};

module.exports = {
  getSkillsByRole,
};