import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result";
import History from "./pages/History";
import Goals from "./pages/Goals";
import GitHubAnalyzer from "./pages/GitHubAnalyzer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "./context/AuthContext";

import Profile from "./pages/Profile";

import Settings from "./pages/Settings";

function App() {
  const { token } =
    useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token
              ? <Home />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <Analyze />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/github-analyzer"
          element={
            <ProtectedRoute>
              <GitHubAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;