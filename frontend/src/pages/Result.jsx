import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    analysis,
    projects,
    roadmap,
  } = location.state || {};

  if (!analysis) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center text-white">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              No Analysis Found
            </h2>

            <p className="text-indigo-200 mb-6">
              Please complete an analysis first.
            </p>

            <button
              onClick={() => navigate("/analyze")}
              className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Go To Analysis
            </button>
          </div>
        </div>
      </>
    );
  }

  const score = analysis.matchPercentage;

  let scoreColor =
    "from-red-500 to-red-700";

  let scoreLabel =
    "Needs Improvement";

  if (score >= 80) {
    scoreColor =
      "from-green-500 to-emerald-700";

    scoreLabel =
      "Strong Candidate";
  } else if (score >= 50) {
    scoreColor =
      "from-yellow-400 to-orange-500";

    scoreLabel =
      "Good Progress";
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center mb-14">

            <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              📊 AI Career Analysis Report
            </div>

            <h1 className="text-6xl font-extrabold mb-4">
              Career Readiness
              <span className="text-indigo-300">
                {" "}Report
              </span>
            </h1>

            <p className="text-xl text-indigo-200">
              Personalized insights for your target career path.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Match Score
                </h2>

                <p className="text-indigo-200">
                  {scoreLabel}
                </p>
              </div>

              <div className="text-6xl font-extrabold">
                {score.toFixed(1)}%
              </div>

            </div>

            <div className="mt-8 w-full bg-white/10 rounded-full h-6 overflow-hidden">

              <div
                className={`bg-gradient-to-r ${scoreColor} h-6 rounded-full transition-all duration-1000`}
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300 text-sm">
                Readiness Level
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {analysis.readinessLevel}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300 text-sm">
                Skills Matched
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {analysis.matchedSkills}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300 text-sm">
                Missing Skills
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {analysis.missingSkills.length}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
              <p className="text-indigo-300 text-sm">
                Learning Time
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {analysis.learningTime}
              </h3>
            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-4">
              🤖 AI Career Insights
            </h2>

            <p className="text-indigo-200 leading-8 text-lg">
              {analysis.recommendation}
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {analysis.missingSkills.length === 0 ? (
                  <span className="bg-green-500 px-4 py-2 rounded-full">
                     No Missing Skills
                  </span>
                ) : (
                  analysis.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-red-500 px-4 py-2 rounded-full"
                      >
                        ❌ {skill}
                      </span>
                    )
                  )
                )}

              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Recommended Projects
              </h2>

              <div className="space-y-4">

                {projects.map(
                  (project, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-2xl p-4"
                    >
                      <div className="font-semibold text-lg">
                         {project.project_name}
                      </div>
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold mb-8">
              Learning Roadmap
            </h2>

            <div className="space-y-6">

              {roadmap.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                    {item.month_number}
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 flex-1">
                    <h3 className="font-bold text-lg">
                      Month {item.month_number}
                    </h3>

                    <p className="text-indigo-200">
                      {item.topic}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

          <div className="text-center mt-12">

            <button
              onClick={() => navigate("/analyze")}
              className="bg-white text-indigo-900 hover:scale-105 px-10 py-4 rounded-2xl text-lg font-bold transition"
            >
              Analyze Another Role →
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Result;