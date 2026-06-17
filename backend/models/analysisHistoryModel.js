const db = require("../config/db");

const saveAnalysis = async (
  roleId,
  matchPercentage,
  readinessLevel,
  learningTime
) => {
  const query = `
    INSERT INTO analysis_history
    (
      role_id,
      match_percentage,
      readiness_level,
      learning_time
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    roleId,
    matchPercentage,
    readinessLevel,
    learningTime,
  ];

  const result =
    await db.query(query, values);

  return result.rows[0];
};

const getAnalysisHistory =
  async () => {
    const query = `
      SELECT
        ah.*,
        r.role_name
      FROM analysis_history ah
      JOIN roles r
      ON ah.role_id = r.id
      ORDER BY ah.created_at DESC;
    `;

    const result =
      await db.query(query);

    return result.rows;
  };

  const deleteHistory = async (id) => {
  const query = `
    DELETE FROM analysis_history
    WHERE id = $1
  `;

  await db.query(query, [id]);
};

module.exports = {
  saveAnalysis,
  getAnalysisHistory,
  deleteHistory,
};