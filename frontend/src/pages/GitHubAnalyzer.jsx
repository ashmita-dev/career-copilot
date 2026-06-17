import { useState } from "react";
import Navbar from "../components/Navbar";
import { analyzeGitHub } from "../services/api";

function GitHubAnalyzer() {
  const [username, setUsername] =
    useState("");

  const [result, setResult] =
  useState(null);

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
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl font-semibold transition"
              >
              Analyze
            </button>

            </div>

          </div>
            {result && (
  <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <div className="mt-6 mb-8 text-center bg-indigo-600/20 border border-indigo-400/30 rounded-2xl p-6">

  <p className="text-indigo-300 text-lg">
    GitHub Readiness Score
  </p>

  <h2 className="text-6xl font-bold mt-2">
    {result.githubScore}/100
  </h2>

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

    </div>

  </div>
)}

        </div>

      </div>

    </>
  );
}

export default GitHubAnalyzer;