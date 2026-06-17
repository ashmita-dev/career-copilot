const generatePersonalizedRoadmap = (
  missingSkills
) => {
  const roadmapTemplates = {
    React: [
      "React Fundamentals (Components, JSX, Props)",
      "State Management and Hooks",
      "React Router and API Integration",
      "Build a Complete React Project",
    ],

    "Node.js": [
      "Node.js Fundamentals",
      "Express.js and REST APIs",
      "Authentication and Security",
      "Build a Backend Project",
    ],

    Docker: [
      "Docker Basics and Containers",
      "Images, Volumes and Networks",
      "Docker Compose",
      "Deploy a Containerized App",
    ],

    TypeScript: [
      "TypeScript Fundamentals",
      "Interfaces, Types and Generics",
      "TypeScript with React",
      "Build a TypeScript Project",
    ],

    MongoDB: [
      "MongoDB Fundamentals",
      "CRUD Operations",
      "Aggregation Pipeline",
      "Build Full Stack App with MongoDB",
    ],

    PostgreSQL: [
      "SQL Fundamentals",
      "Joins and Relationships",
      "Indexes and Optimization",
      "Database Design Project",
    ],

    Git: [
      "Git Basics",
      "Branching and Merging",
      "GitHub Collaboration",
      "Open Source Workflow",
    ],

    AWS: [
      "AWS Fundamentals",
      "EC2 and S3",
      "Deployment and Hosting",
      "Cloud Project",
    ],

    Figma: [
      "Figma Fundamentals",
      "Wireframing",
      "High Fidelity UI Design",
      "Design Portfolio Project",
    ],

    "UI Design": [
      "Design Principles",
      "Typography and Color Theory",
      "Responsive Design",
      "Create Complete UI Case Study",
    ],

    "UX Research": [
      "User Research Methods",
      "Personas and User Flows",
      "Usability Testing",
      "UX Case Study Project",
    ],
  };

  const roadmap = [];

  let month = 1;

  missingSkills.forEach((skill) => {
    const topics =
      roadmapTemplates[skill];

    if (topics) {
      topics.forEach((topic) => {
        roadmap.push({
          month_number: month++,
          topic,
        });
      });
    } else {
      roadmap.push({
        month_number: month++,
        topic: `Learn ${skill}`,
      });
    }
  });

  roadmap.push({
    month_number: month++,
    topic:
      "Build a Portfolio Project Using Newly Learned Skills",
  });

  roadmap.push({
    month_number: month++,
    topic:
      "Prepare Resume, LinkedIn and GitHub",
  });

  roadmap.push({
    month_number: month++,
    topic:
      "Apply for Internships and Start Interview Preparation",
  });

  return roadmap;
};

const analyzeSkills = (
  requiredSkills,
  userSkills
) => {
  const required =
    requiredSkills.map(
      (skill) =>
        skill.skill_name
    );

  const user =
    userSkills.map(
      (skill) =>
        skill.skill_name
    );

  const missingSkills =
    required.filter(
      (skill) =>
        !user.includes(skill)
    );

  const matchedSkills =
    required.length -
    missingSkills.length;

  const totalSkills =
    required.length;

  const matchPercentage =
    (matchedSkills /
      totalSkills) *
    100;

  let readinessLevel =
    "Beginner";

  let learningTime =
    "6+ Months";

  if (
    matchPercentage >= 80
  ) {
    readinessLevel =
      "Job Ready";

    learningTime =
      "1-2 Months";
  } else if (
    matchPercentage >= 50
  ) {
    readinessLevel =
      "Intermediate";

    learningTime =
      "3-4 Months";
  }

  let recommendation =
    "Focus on building core technical skills and complete guided projects.";

  if (
    matchPercentage >= 80
  ) {
    recommendation =
      "You are close to being job-ready. Focus on advanced projects, interview preparation, and portfolio refinement.";
  } else if (
    matchPercentage >= 50
  ) {
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
    roadmap:
      generatePersonalizedRoadmap(
        missingSkills
      ),
  };
};

module.exports = {
  analyzeSkills,
};