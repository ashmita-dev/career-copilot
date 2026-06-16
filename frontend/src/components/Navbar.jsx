import { Link, useLocation } from "react-router-dom";

function Navbar() {
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

        <div className="flex gap-3">

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

        </div>

      </div>

    </nav>
  );
}

export default Navbar;