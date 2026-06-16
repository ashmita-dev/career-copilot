const db = require("../config/db");

const createGoal = async (
  roleId,
  targetScore
) => {
  const query = `
    INSERT INTO career_goals
    (
      role_id,
      target_score
    )
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [
    roleId,
    targetScore,
  ];

  const result =
    await db.query(query, values);

  return result.rows[0];
};

const getGoals = async () => {
  const query = `
    SELECT
      cg.*,
      r.role_name
    FROM career_goals cg
    JOIN roles r
    ON cg.role_id = r.id
    ORDER BY cg.created_at DESC;
  `;

  const result =
    await db.query(query);

  return result.rows;
};

module.exports = {
  createGoal,
  getGoals,
};