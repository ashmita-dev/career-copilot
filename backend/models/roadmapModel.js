const pool = require("../config/db");

const getRoadmapByRole = async (roleId) => {
  const result = await pool.query(
    `
    SELECT
      month_number,
      topic
    FROM roadmaps
    WHERE role_id = $1
    ORDER BY month_number
    `,
    [roleId]
  );

  return result.rows;
};

module.exports = {
  getRoadmapByRole,
};