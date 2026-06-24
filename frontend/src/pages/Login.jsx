import React, {
  useState,
} from "react";

import {
  loginUser,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import {
  Navigate,
} from "react-router-dom";

import { Link } from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "react-toastify";

function Login() {
  const { token } = useAuth();

  if (token) {
    return (
      <Navigate to="/" />
    );
  }

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin =
    async () => {
      if (!email || !password) {
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
          await loginUser({
            email,
            password,
          });

        const token =
          response.data.token;

        const user =
          response.data.user;

        login(
          token,
          user
        );

        toast.success(
          "Login Successful"
        );

        navigate("/");

        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed"
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
          Welcome Back
        </h1>

        <p className="text-center text-slate-300 mt-2 mb-8">
          Sign in to continue your career journey
        </p>

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
              placeholder="Enter your password"
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
          onClick={handleLogin}
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
            ? "Logging In..."
            : "Login"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10"></div>

          <span className="px-4 text-sm text-slate-400">
            New User
          </span>

          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <p className="text-center text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-indigo-400
              hover:text-indigo-300
              font-semibold
              transition-colors
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;