const analyzeSkills = (requiredSkills, userSkills) => {
  const required = requiredSkills.map(
    skill => skill.skill_name
  );

  const user = userSkills.map(
    skill => skill.skill_name
  );

  const missingSkills = required.filter(
    skill => !user.includes(skill)
  );

  const matchPercentage =
    ((required.length - missingSkills.length) /
      required.length) *
    100;

  return {
    matchPercentage,
    missingSkills,
  };
};

module.exports = {
  analyzeSkills,
};