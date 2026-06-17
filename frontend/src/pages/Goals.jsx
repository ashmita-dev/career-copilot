import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getRoles,
  createGoal,
  getGoals,
  deleteGoal,
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

  const handleDeleteGoal = async (
  id
) => {
  if (
  !window.confirm(
    "Delete this goal?"
  )
)
  return;
  try {
    await deleteGoal(id);

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

           {goals.map((goal) => {
  const progress = Math.min(
    ((goal.current_score || 0) /
      goal.target_score) *
      100,
    100
  );

  const achieved =
    (goal.current_score || 0) >=
    goal.target_score;

  return (
    <div
      key={goal.id}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex justify-between items-start">

  <h2 className="text-2xl font-bold">
    {goal.role_name}
  </h2>

</div>

          <p className="text-indigo-200 mt-2">
            Target Score: {goal.target_score}%
          </p>

          <p className="text-indigo-200">
            Current Score:{" "}
            {Number(
              goal.current_score || 0
            ).toFixed(1)}
            %
          </p>
        </div>

        <div className="flex items-center gap-3">

  <button
    onClick={() =>
      handleDeleteGoal(goal.id)
    }
    className="text-red-400 hover:text-red-300 text-xl transition"
  >
    🗑️
  </button>

  {achieved ? (
    <span className="bg-green-500 px-4 py-2 rounded-full font-semibold">
      🏆 Goal Achieved
    </span>
  ) : (
    <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
      In Progress
    </span>
  )}

</div>
      </div>

      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="text-indigo-300">
        Progress: {progress.toFixed(0)}%
      </p>

      <p className="text-indigo-400 text-sm mt-3">
        {new Date(
          goal.created_at
        ).toLocaleString()}
      </p>
    </div>
  );
})}

          </div>

        </div>

      </div>
    </>
  );
}

export default Goals;