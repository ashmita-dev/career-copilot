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

      </Routes>
    </BrowserRouter>
  );
}

export default App;