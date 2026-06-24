import React, {
  useState,
} from "react";

import {
  registerUser,
} from "../services/api";

import {
  Navigate,
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "react-toastify";

function Register() {
  const { token } =
    useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  if (token) {
    return (
      <Navigate to="/" />
    );
  }

  const handleRegister =
    async () => {
      if (!name || !email || !password) {
        toast.error(
          "Please fill all fields"
        );

        return;
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error(
          "Please enter a valid email"
        );

        return;
      }

      if (password.length < 6) {
        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      setLoading(true);

      try {
        const response =
          await registerUser({
            name,
            email,
            password,
          });

        toast.success(
          response.data.message ||
          "Registration Successful"
        );

        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">
      <div
        className="
          bg-white/5
          backdrop-blur-2xl
          border border-white/10
          p-10
          rounded-3xl
          w-[440px]
          shadow-2xl
          shadow-indigo-950/40
          transition-all
          duration-300
          hover:shadow-purple-900/20
        "
      >
        <div className="flex justify-center mb-6">
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
              shadow-lg
            "
          >
            CC
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-slate-300 mt-2 mb-8">
          Join Career Copilot and start building your roadmap
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              transition-all
            "
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              transition-all
            "
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-300 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                transition-all
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                hover:text-white
              "
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            hover:from-indigo-500
            hover:to-purple-500
            py-3
            rounded-xl
            font-semibold
            cursor-pointer
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-95
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10"></div>

          <span className="px-4 text-sm text-slate-400">
            Account Access
          </span>

          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <p className="text-center mt-4 text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-indigo-400
              hover:text-indigo-300
              font-semibold
              transition-colors
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;