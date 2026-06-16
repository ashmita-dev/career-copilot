const pool = require("../config/db");

const getAllRoles = async () => {

  const result = await pool.query(
    "SELECT * FROM roles ORDER BY role_name"
  );

  return result.rows;
};

module.exports = {
  getAllRoles,
};