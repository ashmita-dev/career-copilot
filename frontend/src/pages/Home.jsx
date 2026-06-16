import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
               AI-Powered Career Growth Platform
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-6">

              Career
              <span className="text-indigo-300">
                {" "}Copilot
              </span>

            </h1>

            <p className="text-2xl md:text-3xl text-indigo-100 mb-6">
              Navigate Your Tech Career
              With AI-Powered Insights
            </p>

            <p className="max-w-3xl mx-auto text-lg text-indigo-200 mb-10">
              Analyze your current skills,
              discover gaps, explore recommended
              projects, and follow a personalized
              roadmap to reach your dream role.
            </p>

            <Link to="/analyze">
              <button className="bg-white text-indigo-900 hover:scale-105 hover:shadow-2xl px-10 py-5 rounded-2xl text-xl font-bold transition duration-300 cursor-pointer">
                Start Career Analysis →
              </button>
            </Link>

          </div>


          <div className="grid md:grid-cols-3 gap-8 mt-24">

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition">

              <div className="text-5xl mb-4">
                🎯
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Skill Gap Analysis
              </h3>

              <p className="text-indigo-100">
                Compare your current skills
                against industry roles and
                instantly identify missing
                competencies.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition">

              <div className="text-5xl mb-4">
                
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Project Recommendations
              </h3>

              <p className="text-indigo-100">
                Build portfolio-worthy projects
                tailored to your target role
                and strengthen your resume.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition">

              <div className="text-5xl mb-4">
                📈
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Learning Roadmaps
              </h3>

              <p className="text-indigo-100">
                Follow a structured learning
                plan designed to accelerate
                your career growth.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;