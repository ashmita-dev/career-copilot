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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/analyze"
          element={<Analyze />}
        />

        <Route
          path="/result"
          element={<Result />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/github-analyzer"
          element={<GitHubAnalyzer />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;