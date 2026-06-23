import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  changePassword,
  deleteAccount,
  updateProfile,
} from "../services/api";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const {
  user,
  setUser,
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

  const [editMode,
setEditMode] =
useState(false);

const [name,
setName] =
useState(user?.name || "");

const [email,
setEmail] =
useState(user?.email || "");

  const [showDeleteModal,
setShowDeleteModal] =
useState(false);

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

const handleUpdateProfile =
async () => {

  try {

    const response =
      await updateProfile({
        name,
        email,
      });

    const updatedUser = {
  ...user,
  name,
  email,
};

localStorage.setItem(
  "user",
  JSON.stringify(updatedUser)
);

setUser(updatedUser);

setMessage(
  response.data.message
);

setEditMode(false);

  } catch (error) {

    setMessage(
      error.response?.data?.message ||
      "Failed to update profile"
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

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">
      Account Information
    </h2>

    {!editMode && (
      <button
        onClick={() =>
          setEditMode(true)
        }
        className="
          bg-indigo-600
          hover:bg-indigo-700
          px-4 py-2
          rounded-xl
          font-semibold
          transition
          cursor-pointer
        "
      >
        Edit Profile
      </button>
    )}

  </div>

  {editMode ? (

    <div className="space-y-4">

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Full Name"
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
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        className="
          w-full
          p-3
          rounded-xl
          bg-white/10
          border
          border-white/20
        "
      />

      <div className="flex gap-3">

        <button
          onClick={handleUpdateProfile}
          className="
            bg-green-600
            hover:bg-green-700
            px-5 py-2
            rounded-xl
            font-semibold
            cursor-pointer
          "
        >
          Save Changes
        </button>

        <button
          onClick={() =>
            setEditMode(false)
          }
          className="
            bg-slate-600
            hover:bg-slate-700
            px-5 py-2
            rounded-xl
            font-semibold
            cursor-pointer
          "
        >
          Cancel
        </button>

      </div>

    </div>

  ) : (

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

  )}

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
          onClick={() =>
          setShowDeleteModal(true)
          }
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

        {showDeleteModal && (
  <div
    className="
      fixed inset-0
      bg-black/60
      flex items-center justify-center
      z-50
    "
  >
    <div
      className="
        bg-slate-900
        border border-red-500/30
        rounded-3xl
        p-8
        w-[450px]
        shadow-2xl
      "
    >
      <h2
        className="
          text-3xl
          font-bold
          text-red-400
          mb-4
        "
      >
        Delete Account
      </h2>

      <p className="text-slate-300 mb-8">
        This action cannot be undone.
        All your goals, analyses,
        GitHub reports and roadmap
        history will be permanently
        deleted.
      </p>

      <div className="flex justify-end gap-4">

        <button
          onClick={() =>
            setShowDeleteModal(false)
          }
          className="
            px-5 py-2
            rounded-xl
            bg-slate-700
            hover:bg-slate-600
          "
        >
          Cancel
        </button>

        <button
          onClick={() => {
  setShowDeleteModal(false);
  handleDeleteAccount();
}}
          className="
            px-5 py-2
            rounded-xl
            bg-red-600
            hover:bg-red-700
            cursor-pointer
            active:scale-95
          "
        >
          Delete
        </button>

      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default Settings;