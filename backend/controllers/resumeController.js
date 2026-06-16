const fs = require("fs");
const pdf = require("pdf-parse");

const extractResumeSkills = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const pdfData = await pdf(dataBuffer);

    const resumeText =
      pdfData.text.toLowerCase();

    const skillsDatabase = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "SQL",
    "Git",
    "GitHub",
    "Docker",
    "Java",
    "Python",
    "C++",
    "REST API",
    "AWS",
    "Linux",
    "TensorFlow",
    "Machine Learning",
    "Deep Learning",
    "Pandas",
    "NumPy",
    "Power BI",
    "Excel",
    "Figma",
    "UI Design",
    "UX Research",
    "Spring Boot",
];

    const detectedSkills =
  skillsDatabase.filter((skill) => {
    const escapedSkill = skill
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(
      `\\b${escapedSkill}\\b`,
      "i"
    );

    return regex.test(resumeText);
  });

    res.status(200).json({
      detectedSkills,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  extractResumeSkills,
};