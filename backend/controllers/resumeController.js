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
      "Java",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "SQL",
      "REST API",
      "Docker",
      "Git",
    ];

    const detectedSkills =
      skillsDatabase.filter((skill) =>
        resumeText.includes(
          skill.toLowerCase()
        )
      );

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