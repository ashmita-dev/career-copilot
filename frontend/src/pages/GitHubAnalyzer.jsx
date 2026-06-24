import { useState } from "react";
import Navbar from "../components/Navbar";
import { analyzeGitHub } from "../services/api";

function GitHubAnalyzer() {
  const [username, setUsername] =
    useState("");

  const [result, setResult] =
    useState(null);

  const getBadge = (score) => {
    if (score >= 80)
      return "🏆 Excellent";

    if (score >= 60)
      return "🚀 Strong";

    if (score >= 40)
      return "📈 Average";

    return "🌱 Beginner";
  };

  const handleAnalyze = async () => {
    try {
      const response =
        await analyzeGitHub(
          username
        );

      setResult(
        response.data
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              GitHub Analyzer
            </h1>

            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Analyze your GitHub profile,
              evaluate your projects,
              and discover how
              internship-ready your portfolio is.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Enter GitHub Username
            </h2>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="e.g. torvalds"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="flex-1 p-4 rounded-2xl bg-white/10 border border-white/20"
              />

              <button
                onClick={handleAnalyze}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl font-semibold transition cursor-pointer active:scale-95"
              >
                Analyze
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="mt-6 mb-8 text-center bg-indigo-600/20 border border-indigo-400/30 rounded-2xl p-6">
                <img
                  src={result.avatar}
                  alt="GitHub Avatar"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-400"
                />

                <p className="text-indigo-300 text-lg">
                  GitHub Readiness Score
                </p>

                <h2 className="text-6xl font-bold mt-2">
                  {result.githubScore}/100
                </h2>

                <p className="text-2xl font-semibold mt-3">
                  {getBadge(result.githubScore)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-indigo-300">
                    Username
                  </p>

                  <p className="text-xl font-semibold">
                    {result.username}
                  </p>
                </div>

                <div>
                  <p className="text-indigo-300">
                    Name
                  </p>

                  <p className="text-xl font-semibold">
                    {result.name || "Not Available"}
                  </p>
                </div>

                <div>
                  <p className="text-indigo-300">
                    Public Repositories
                  </p>

                  <p className="text-xl font-semibold">
                    {result.publicRepos}
                  </p>
                </div>

                <div>
                  <p className="text-indigo-300">
                    Followers
                  </p>

                  <p className="text-xl font-semibold">
                    {result.followers}
                  </p>
                </div>

                <div>
                  <p className="text-indigo-300">
                    Total Stars
                  </p>

                  <p className="text-xl font-semibold">
                    ⭐ {result.totalStars}
                  </p>
                </div>

                <div className="md:col-span-2 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 mt-2">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    🏆 Top Repository
                  </h3>

                  <p className="mb-2">
                    <span className="text-indigo-300">
                      Repository:
                    </span>{" "}
                    {result.topRepo?.name}
                  </p>

                  <p className="mb-2">
                    <span className="text-indigo-300">
                      Stars:
                    </span>{" "}
                    ⭐ {result.topRepo?.stars}
                  </p>

                  <p>
                    <span className="text-indigo-300">
                      Language:
                    </span>{" "}
                    {result.topRepo?.language || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">
                    Strengths
                  </h3>

                  {result.strengths?.map(
                    (item, index) => (
                      <p
                        key={index}
                        className="mb-2"
                      >
                        ✅ {item}
                      </p>
                    )
                  )}
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    Improvements
                  </h3>

                  {result.improvements?.map(
                    (item, index) => (
                      <p
                        key={index}
                        className="mb-2"
                      >
                        ⚠️ {item}
                      </p>
                    )
                  )}
                </div>
              </div>

              <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-indigo-300 mb-4">
                  🎯 Recommended Next Steps
                </h3>

                {result.actionPlan?.length > 0 ? (
                  result.actionPlan.map(
                    (step, index) => (
                      <p
                        key={index}
                        className="mb-3"
                      >
                        {index + 1}. {step}
                      </p>
                    )
                  )
                ) : (
                  <p>
                    Your GitHub profile is in good shape.
                    Focus on building advanced projects
                    and maintaining consistent activity.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GitHubAnalyzer;