import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getAnalysisHistory,
  deleteHistory,
} from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function History() {
  const [history, setHistory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedHistoryId, setSelectedHistoryId] =
    useState(null);

  const totalAnalyses = history.length;

  const highestScore =
    history.length > 0
      ? Math.max(
          ...history.map(
            (item) =>
              Number(
                item.match_percentage
              )
          )
        )
      : 0;

  const averageScore =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) =>
              sum +
              Number(
                item.match_percentage
              ),
            0
          ) / history.length
        ).toFixed(1)
      : 0;

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

  const handleDeleteHistory =
    async () => {
      try {
        await deleteHistory(
          selectedHistoryId
        );

        fetchHistory();

        setShowDeleteModal(false);

        setSelectedHistoryId(null);
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

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300">
                Total Analyses
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {totalAnalyses}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300">
                Highest Score
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {highestScore.toFixed(1)}%
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300">
                Average Score
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {averageScore}%
              </h2>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6">
              Progress Trend
            </h2>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="id"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="match_percentage"
                    stroke="#818cf8"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">
                    {item.role_name}
                  </h2>

                  <button
                    onClick={() => {
                      setSelectedHistoryId(
                        item.id
                      );

                      setShowDeleteModal(
                        true
                      );
                    }}
                    className="text-red-400 hover:text-red-300 text-xl transition cursor-pointer active:scale-95"
                  >
                    🗑️
                  </button>
                </div>

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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-8 w-[420px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Delete Analysis
            </h2>

            <p className="text-indigo-200 mb-8">
              Are you sure you want to delete this analysis?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedHistoryId(null);
                }}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteHistory}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition cursor-pointer active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default History;