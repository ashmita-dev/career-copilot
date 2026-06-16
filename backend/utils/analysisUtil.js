const analyzeSkills = (requiredSkills, userSkills) => {
  const required = requiredSkills.map(
    (skill) => skill.skill_name
  );

  const user = userSkills.map(
    (skill) => skill.skill_name
  );

  const missingSkills = required.filter(
    (skill) => !user.includes(skill)
  );

  const matchedSkills =
    required.length - missingSkills.length;

  const totalSkills = required.length;

  const matchPercentage =
    (matchedSkills / totalSkills) * 100;

  let readinessLevel = "Beginner";
  let learningTime = "6+ Months";

  if (matchPercentage >= 80) {
    readinessLevel = "Job Ready";
    learningTime = "1-2 Months";
  } else if (matchPercentage >= 50) {
    readinessLevel = "Intermediate";
    learningTime = "3-4 Months";
  }

  let recommendation =
    "Focus on building core technical skills and complete guided projects.";

  if (matchPercentage >= 80) {
    recommendation =
      "You are close to being job-ready. Focus on advanced projects, interview preparation, and portfolio refinement.";
  } else if (matchPercentage >= 50) {
    recommendation =
      "You have a solid foundation. Prioritize missing skills and build portfolio projects to strengthen your profile.";
  }

  return {
    matchPercentage,
    missingSkills,
    matchedSkills,
    totalSkills,
    readinessLevel,
    learningTime,
    recommendation,
  };
};

module.exports = {
  analyzeSkills,
};