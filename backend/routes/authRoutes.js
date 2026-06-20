const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } =
      req.body;
    
      const existingUser =
  await pool.query(
    `
    SELECT *
    FROM auth_users
    WHERE email = $1
    `,
    [email]
  );

if (
  existingUser.rows.length > 0
) {
  return res.status(400).json({
    success: false,
    message:
      "Email already registered",
  });
}

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await pool.query(
  `
  INSERT INTO auth_users
  (name, email, password)
  VALUES ($1, $2, $3)
  `,
  [
    name,
    email,
    hashedPassword,
  ]
);

    res.json({
      success: true,
      user: {
        name,
        email,
      },
      hashedPassword,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const userResult =
      await pool.query(
        `
        SELECT *
        FROM auth_users
        WHERE email = $1
        `,
        [email]
      );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
      }
     const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

return res.json({
  success: true,
  message: "Login successful",
  token,
});
      

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    res.json({
      success: true,
      user: req.user,
    });

  }
);

module.exports = router;