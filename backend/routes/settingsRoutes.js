const express = require("express");

const router =
  express.Router();

const {
  changePassword,
  deleteAccount,
} = require(
  "../controllers/settingsController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.delete(
  "/delete-account",
  authMiddleware,
  deleteAccount
);

module.exports = router;