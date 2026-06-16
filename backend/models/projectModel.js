const pool = require("../config/db");

const getProjectsByRole = async (roleId) => {
  const result = await pool.query(
    `
    SELECT
      project_name,
      description
    FROM projects
    WHERE role_id = $1
    ORDER BY project_name
    `,
    [roleId]
  );

  return result.rows;
};

module.exports = {
  getProjectsByRole,
};