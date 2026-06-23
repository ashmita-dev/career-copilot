const db = require("../config/db");

const saveGithubReport = async (
  userId,
  githubUsername,
  githubScore
) => {
  const query = `
    INSERT INTO github_reports
    (
      user_id,
      github_username,
      github_score
    )
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    userId,
    githubUsername,
    githubScore,
  ];

  const result = await db.query(
    query,
    values
  );

  return result.rows[0];
};

const getGithubReports = async (
  userId
) => {
  const query = `
    SELECT *
    FROM github_reports
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await db.query(
    query,
    [userId]
  );

  return result.rows;
};

module.exports = {
  saveGithubReport,
  getGithubReports,
};