const db = require("../config/db");

const saveRoadmapHistory = async (
  userId,
  roleId
) => {

  const query = `
    INSERT INTO roadmap_history
    (
      user_id,
      role_id
    )
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result =
    await db.query(
      query,
      [userId, roleId]
    );

  return result.rows[0];
};

const getRoadmapHistory =
  async (userId) => {

    const query = `
      SELECT *
      FROM roadmap_history
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

    const result =
      await db.query(
        query,
        [userId]
      );

    return result.rows;
};

module.exports = {
  saveRoadmapHistory,
  getRoadmapHistory,
};