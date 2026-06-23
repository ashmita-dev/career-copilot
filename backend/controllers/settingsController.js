const bcrypt = require("bcrypt");
const db = require("../config/db");

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const userId =
      req.user.userId;

    console.log("REQ.USER:", req.user);
console.log("USER ID:", userId);

  const userResult =
  await db.query(
    `
    SELECT *
    FROM auth_users
    WHERE id = $1
    `,
    [userId]
  );

console.log(userResult.rows);

const user =
  userResult.rows[0];

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await db.query(
  `
  UPDATE auth_users
  SET password = $1
  WHERE id = $2
  `,
  [hashedPassword, userId]
);

    res.status(200).json({
      message:
        "Password updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  changePassword,
};