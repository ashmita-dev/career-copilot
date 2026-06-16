import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getRoles,
  createGoal,
  getGoals,
} from "../services/api";

function Goals() {
  const [roles, setRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedRole, setSelectedRole] =
    useState("");
  const [targetScore, setTargetScore] =
    useState("");

  useEffect(() => {
    fetchRoles();
    fetchGoals();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateGoal = async () => {
    try {
      if (!selectedRole || !targetScore) {
        alert("Please fill all fields");
        return;
      }

      await createGoal({
        roleId: selectedRole,
        targetScore,
      });

      setSelectedRole("");
      setTargetScore("");

      fetchGoals();
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
            Career Goals
          </h1>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              Set New Goal
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value
                  )
                }
                className="p-4 rounded-xl bg-white/10 border border-white/20"
              >
                <option value="">
                  Select Role
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

              <input
                type="number"
                placeholder="Target Score (%)"
                value={targetScore}
                onChange={(e) =>
                  setTargetScore(
                    e.target.value
                  )
                }
                className="p-4 rounded-xl bg-white/10 border border-white/20"
              />

            </div>

            <button
              onClick={handleCreateGoal}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold"
            >
              Save Goal
            </button>

          </div>

          <div className="space-y-6">

            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6"
              >
                <h2 className="text-2xl font-bold">
                  {goal.role_name}
                </h2>

                <p className="text-indigo-200 mt-2">
                  Target Score:
                  {" "}
                  {goal.target_score}%
                </p>

                <p className="text-indigo-300 text-sm mt-2">
                  {new Date(
                    goal.created_at
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

export default Goals;