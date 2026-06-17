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
  r.role_name,

  COALESCE(
    (
      SELECT ah.match_percentage
      FROM analysis_history ah
      WHERE ah.role_id = cg.role_id
      ORDER BY ah.created_at DESC
      LIMIT 1
    ),
    0
  ) AS current_score

FROM career_goals cg

JOIN roles r
ON cg.role_id = r.id

ORDER BY cg.created_at DESC`;

  const result =
    await db.query(query);

  return result.rows;
};

const deleteGoal = async (id) => {
  const query = `
    DELETE FROM career_goals
    WHERE id = $1
    RETURNING *;
  `;

  const result = await db.query(
    query,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createGoal,
  getGoals,
  deleteGoal,
};