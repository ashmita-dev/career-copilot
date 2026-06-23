const db = require("../config/db");

const saveAnalysis = async (
  roleId,
  matchPercentage,
  readinessLevel,
  learningTime,
  userId
) => {
  const query = `
    INSERT INTO analysis_history
(
  role_id,
  match_percentage,
  readiness_level,
  learning_time,
  user_id
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
  `;

  const values = [
  roleId,
  matchPercentage,
  readinessLevel,
  learningTime,
  userId,
];

  const result =
    await db.query(query, values);

  return result.rows[0];
};

const getAnalysisHistory =
  async (userId) => { 
    const query = `
      SELECT
  ah.*,
  r.role_name
FROM analysis_history ah
JOIN roles r
ON ah.role_id = r.id

WHERE ah.user_id = $1

ORDER BY ah.created_at DESC;
    `;

    const result =
  await db.query(
    query,
    [userId]
  );

    return result.rows;
  };

  const deleteHistory = async (
  id,
  userId
) => {
  const query = `
    DELETE FROM analysis_history
WHERE id = $1
AND user_id = $2
  `;

  await db.query(
  query,
  [
    id,
    userId
  ]
);
};

module.exports = {
  saveAnalysis,
  getAnalysisHistory,
  deleteHistory,
};