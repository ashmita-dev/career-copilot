import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getGoals,
  getAnalysisHistory,
  getGithubReports,
  getRoadmapHistory,
} from "../services/api";

function Profile() {
  const { user } = useAuth();

  const [goals, setGoals] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [githubReports, setGithubReports] =
    useState([]);

  const [roadmaps, setRoadmaps] =
    useState([]);

  useEffect(() => {
    fetchGoals();

    fetchHistory();

    fetchGithubReports();

    fetchRoadmaps();
  }, []);

  const fetchGoals = async () => {
    try {
      const response =
        await getGoals();

      setGoals(
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response =
        await getAnalysisHistory();

      setHistory(
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGithubReports =
    async () => {
      try {
        const response =
          await getGithubReports();

        setGithubReports(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchRoadmaps =
    async () => {
      try {
        const response =
          await getRoadmapHistory();

        setRoadmaps(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-indigo-400/30">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                {user?.name}
              </h1>

              <p className="text-indigo-200 text-lg">
                {user?.email}
              </p>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium">
                Active Account
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-xl">
            <p className="text-indigo-200 text-sm">
              Goals
            </p>

            <h2 className="text-5xl font-extrabold mt-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {goals.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-xl">
            <p className="text-indigo-200 text-sm">
              Career Analyses
            </p>

            <h2 className="text-5xl font-extrabold mt-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {history.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-xl">
            <p className="text-indigo-200 text-sm">
              GitHub Reports
            </p>

            <h2 className="text-5xl font-extrabold mt-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {githubReports.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-xl">
            <p className="text-indigo-200 text-sm">
              Roadmaps
            </p>

            <h2 className="text-5xl font-extrabold mt-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {roadmaps.length}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Career Progress
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Account Created</span>

                <span className="text-green-400 font-semibold">
                  ✓ Completed
                </span>
              </div>

              <div className="flex justify-between">
                <span>Profile Setup</span>

                <span className="text-green-400 font-semibold">
                  ✓ Completed
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Career Analysis
                </span>

                {history.length > 0 ? (
                  <span className="text-green-400 font-semibold">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-orange-500 font-semibold">
                    Pending
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <span>Goals Added</span>

                {goals.length > 0 ? (
                  <span className="text-green-400 font-semibold">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-orange-500 font-semibold">
                    Pending
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <span>GitHub Analysis</span>

                {githubReports.length > 0 ? (
                  <span className="text-green-400 font-semibold">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-orange-500 font-semibold">
                    Pending
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <span>Roadmap Generated</span>

                {roadmaps.length > 0 ? (
                  <span className="text-green-400 font-semibold">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-orange-500 font-semibold">
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Account Information
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-indigo-200">
                  Full Name
                </p>

                <p className="font-semibold text-lg text-white">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-indigo-200">
                  Email Address
                </p>

                <p className="font-semibold text-lg text-white">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-indigo-200">
                  Role
                </p>

                <p className="font-semibold text-lg text-white">
                  Student
                </p>
              </div>

              <div>
                <p className="text-sm text-indigo-200">
                  Account Status
                </p>

                <p className="font-semibold text-green-400">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;