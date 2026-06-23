import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  changePassword,
  deleteAccount,
} from "../services/api";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const {
  user,
  logout,
} = useAuth();

  const [currentPassword,
  setCurrentPassword] =
  useState("");

const [newPassword,
  setNewPassword] =
  useState("");

const [message,
  setMessage] =
  useState("");

  const handleChangePassword =
  async () => {

  try {

    const response =
      await changePassword({
        currentPassword,
        newPassword,
      });

    setMessage(
      response.data.message
    );

    setCurrentPassword("");
    setNewPassword("");

  } catch (error) {

    setMessage(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }
};

const handleDeleteAccount =
async () => {

 const confirmDelete =
  window.confirm(
    "⚠️ This will permanently delete your account and cannot be undone. Continue?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response =
      await deleteAccount();

    alert(
      response.data.message
    );

    logout();

    navigate("/register");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to delete account"
    );

  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-2">
          Settings
        </h1>

        <p className="text-indigo-200 mb-10">
          Manage your account and preferences.
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-indigo-200 text-sm">
                Full Name
              </p>

              <p className="text-lg font-semibold">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-indigo-200 text-sm">
                Email Address
              </p>

              <p className="text-lg font-semibold">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
  <h2 className="text-2xl font-bold mb-6">
    Security
  </h2>

  <div className="space-y-4">

    <input
      type="password"
      placeholder="Current Password"
      value={currentPassword}
      onChange={(e) =>
        setCurrentPassword(e.target.value)
      }
      className="
        w-full
        p-3
        rounded-xl
        bg-white/10
        border
        border-white/20
      "
    />

    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) =>
        setNewPassword(e.target.value)
      }
      className="
        w-full
        p-3
        rounded-xl
        bg-white/10
        border
        border-white/20
      "
    />

    <button
      onClick={handleChangePassword}
      className="
        bg-indigo-600
        hover:bg-indigo-700
        px-6 py-3
        rounded-xl
        font-semibold
        transition
        cursor-pointer
        active:scale-95
      "
    >
      Change Password
    </button>

    {message && (
      <p className="text-green-300">
        {message}
      </p>
    )}

  </div>
</div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Preferences
          </h2>

          <p className="text-indigo-200">
            Theme and notification settings coming soon.
          </p>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-red-300 mb-6">
            Danger Zone
          </h2>

          <button
          onClick={handleDeleteAccount}
            className="
              bg-red-600
              hover:bg-red-700
              px-6 py-3
              rounded-xl
              font-semibold
              transition
              cursor-pointer
              active:scale-95
            "
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;