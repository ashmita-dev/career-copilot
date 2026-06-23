import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {
  token,
  user,
  logout,
} = useAuth();

  const navigate = useNavigate();
  const [showMenu, setShowMenu] =
  useState(false);  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            CC
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Career Copilot
            </h1>

            <p className="text-xs text-slate-500">
              AI Career Intelligence
            </p>
          </div>
        </Link>

        <div className="flex gap-3 items-center">
          <Link
            to="/"
            className={`px-5 py-2 rounded-xl transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-indigo-600 text-white font-semibold shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Home
          </Link>

          {!token && (
          <Link
            to="/login"
            className={`px-5 py-2 rounded-xl transition-all duration-300 ${
            location.pathname === "/login"
            ? "bg-indigo-600 text-white font-semibold shadow-md"
            : "text-slate-700 hover:bg-slate-100"
          }`}
          >
            Login
          </Link>
        )}

        {!token && (
        <Link
          to="/register"
          className={`px-5 py-2 rounded-xl transition-all duration-300 ${
          location.pathname === "/register"
          ? "bg-indigo-600 text-white font-semibold shadow-md"
          : "text-slate-700 hover:bg-slate-100"
        }`}
        >
          Register
        </Link>
        )}

          {token && (
          <Link
            to="/analyze"
            className={`px-5 py-2 rounded-xl transition-all duration-300 ${
            location.pathname === "/analyze"
            ? "bg-indigo-600 text-white font-semibold shadow-md"
            : "text-slate-700 hover:bg-slate-100"
          }`}
          >
            Analyze
          </Link>
          )}

          {token && (
  <>
    <Link
      to="/history"
      className={`px-5 py-2 rounded-xl transition-all duration-300 ${
        location.pathname === "/history"
          ? "bg-indigo-600 text-white font-semibold shadow-md"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      History
    </Link>

    <Link
      to="/goals"
      className={`px-5 py-2 rounded-xl transition-all duration-300 ${
        location.pathname === "/goals"
          ? "bg-indigo-600 text-white font-semibold shadow-md"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      Goals
    </Link>

    <Link
      to="/github-analyzer"
      className={`px-5 py-2 rounded-xl transition-all duration-300 ${
        location.pathname === "/github-analyzer"
          ? "bg-indigo-600 text-white font-semibold shadow-md"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      GitHub Analyzer
    </Link>
  </>
)}

         {token && (
  <div className="flex items-center gap-4 relative">

   <div
   onClick={() =>
  setShowMenu(!showMenu)
}
  className="
    flex items-center gap-3
    px-4 py-2
    rounded-2xl
    hover:bg-slate-100
    transition-all duration-300
    cursor-pointer
    hover:scale-105
  "
>
  <div
   className="
    w-10 h-10
    rounded-full
    bg-gradient-to-br
    from-indigo-500
    to-purple-600
    flex items-center justify-center
    text-white font-bold
    shadow-md
  ">
    {user?.name?.charAt(0)?.toUpperCase()}
  </div>

  <div className="text-left">
    <p className="text-xs text-slate-500">
      View Profile
    </p>

    <p className="font-semibold text-slate-800 flex items-center gap-1">
  {user?.name}
  <span className="text-slate-500 text-xs">
    ▼
  </span>
</p>
  </div>
</div>
{showMenu && (
  <div
    className="
      absolute
      top-20
      right-6
      w-52
      bg-white
      rounded-2xl
      shadow-2xl
      border
      border-slate-200
      overflow-hidden
      z-50
    "
  >
    <Link
      to="/profile"
      className="
        block
        px-5
        py-3
        hover:bg-slate-100
        transition
      "
      onClick={() =>
        setShowMenu(false)
      }
    >
      👤 Profile
    </Link>

    <Link
      to="/settings"
      className="
        block
        px-5
        py-3
        hover:bg-slate-100
        transition
      "
      onClick={() =>
        setShowMenu(false)
      }
    >
      ⚙️ Settings
    </Link>

    <button
      onClick={() => {
        setShowMenu(false);
        handleLogout();
      }}
      className="
        w-full
        text-left
        px-5
        py-3
        hover:bg-red-50
        text-red-600
        transition
      "
    >
      🚪 Logout
    </button>
  </div>
)}
  </div>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;