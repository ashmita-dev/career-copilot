import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getRoles,
  getSkills,
  getRoleSkills,
  analyzeProfile as analyzeProfileAPI,
  getProjects,
  uploadResume,
} from "../services/api";

function Analyze() {
  const [roles, setRoles] = useState([]); 
  const [skills, setSkills] = useState([]);
  const [roleSkills, setRoleSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [resumeFeedback, setResumeFeedback] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
    fetchSkills();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchRoleSkillsData(selectedRole);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  };

  const fetchRoleSkillsData = async (roleId) => {
    try {
      const response = await getRoleSkills(roleId);
      setRoleSkills(response.data);
    } catch (error) {
      console.error("Failed to fetch role skills:", error);
    }
  };

  const handleSkillChange = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(
        selectedSkills.filter(
          (skill) => skill !== skillName
        )
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skillName,
      ]);
    }
  };

  const handleResumeUpload = async () => {
  try {
    if (!resumeFile) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    const response =
      await uploadResume(formData);

    setSelectedSkills((prev) => [
  ...new Set([
    ...prev,
    ...response.data.detectedSkills,
  ]),
]);

    setUploadMessage(
      `Detected ${response.data.detectedSkills.length} skills from resume`
    );

    setResumeFeedback(
    response.data.feedback
);

  } catch (error) {
    console.error(error);
    setUploadMessage(
      "Failed to process resume"
    );
  }
};

  const analyzeProfile = async () => {
    try {
      if (!selectedRole) {
        alert("Please select a role");
        return;
      }

      const analysisResponse =
        await analyzeProfileAPI({
          roleId: selectedRole,
          userSkills: selectedSkills,
        });

      const projectsResponse =
        await getProjects(selectedRole);

      navigate("/result", {
        state: {
        analysis: analysisResponse.data,
        projects: projectsResponse.data,
        roadmap:
        analysisResponse.data.roadmap,
      },
});
    } catch (error) {
      console.error(
        "Analysis failed:",
        error
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center mb-16">

            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
               Career Readiness Analysis
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
              Analyze Your
              <span className="text-indigo-300">
                {" "}Tech Career
              </span>
            </h1>

            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Select your dream role,
              choose your current skills,
              and generate a personalized
              AI-powered roadmap for success.
            </p>

          </div>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

  <h2 className="text-2xl font-bold mb-4">
    Upload Resume
  </h2>

  <p className="text-indigo-200 mb-6">
    Upload your resume and automatically detect your skills.
  </p>

  <div className="flex flex-col md:flex-row gap-4">

    <input
      type="file"
      accept=".pdf"
      onChange={(e) =>
        setResumeFile(e.target.files[0])
      }
      className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20"
    />

    <button
      onClick={handleResumeUpload}
      className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold transition cursor-pointer active:scale-95"
    >
      Upload Resume
    </button>

  </div>

  {uploadMessage && (
    <div className="mt-4 bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-3 rounded-xl font-medium">
      {uploadMessage}
    </div>
  )}

</div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Select Target Role
            </h2>

            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white"
            >
              <option
                value=""
                className="text-black"
              >
                Choose a role
              </option>

              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.id}
                  className="text-black"
                >
                  {role.role_name}
                </option>
              ))}
            </select>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {roleSkills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedSkills.includes(
                        skill.skill_name
                      )
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedSkills.includes(
                      skill.skill_name
                    )
                      ? "✓ "
                      : "✗ "}
                    {skill.skill_name}
                  </span>
                ))}

              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Your Skills
              </h2>

              <div className="grid grid-cols-2 gap-3">

                {skills.map((skill) => (
                  <label
                    key={skill.id}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(
                        skill.skill_name
                      )}
                      onChange={() =>
                        handleSkillChange(
                          skill.skill_name
                        )
                      }
                      className="w-4 h-4"
                    />

                    {skill.skill_name}
                  </label>
                ))}

              </div>

            </div>

          </div>

          <div className="text-center mt-12">

            <button
              onClick={analyzeProfile}
              className="bg-white text-indigo-900 hover:scale-105 hover:shadow-2xl px-10 py-5 rounded-2xl text-xl font-bold transition duration-300 cursor-pointer"
            >
              Generate Career Report →
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Analyze;