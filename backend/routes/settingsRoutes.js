const express = require("express");

const router =
  express.Router();

const {
  changePassword,
  deleteAccount,
  updateProfile,
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

router.put(
  "/update-profile",
  authMiddleware,
  updateProfile
);

module.exports = router;