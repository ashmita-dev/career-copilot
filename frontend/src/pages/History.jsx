import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAnalysisHistory } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response =
        await getAnalysisHistory();

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-5xl font-bold mb-10">
            Analysis History
          </h1>

          <div className="space-y-6">

            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6"
              >
                <h2 className="text-2xl font-bold">
                  {item.role_name}
                </h2>

                <p className="text-indigo-200 mt-2">
                  Match Score:
                  {" "}
                  {Number(
                    item.match_percentage
                  ).toFixed(1)}
                  %
                </p>

                <p className="text-indigo-200">
                  Readiness:
                  {" "}
                  {item.readiness_level}
                </p>

                <p className="text-indigo-200">
                  Learning Time:
                  {" "}
                  {item.learning_time}
                </p>

                <p className="text-indigo-300 mt-2 text-sm">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default History;