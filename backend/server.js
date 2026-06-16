const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const roleRoutes = require("./routes/roleRoutes");
const skillRoutes = require("./routes/skillRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const projectRoutes = require("./routes/projectRoutes");
const roleSkillRoutes = require("./routes/roleSkillRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roles", roleRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/role-skills", roleSkillRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Career Copilot Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});