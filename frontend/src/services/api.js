import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  }
);

export const getRoles = () =>
  API.get("/roles");

export const getSkills = () =>
  API.get("/skills");

export const getRoleSkills = (roleId) =>
  API.get(`/role-skills/${roleId}`);

export const analyzeProfile = (data) =>
  API.post("/analyze", data);

export const getProjects = (roleId) =>
  API.get(`/projects/${roleId}`);

export const getRoadmap = (roleId) =>
  API.get(`/roadmaps/${roleId}`);

export const uploadResume = (formData) =>
  API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const getAnalysisHistory = () =>
  API.get("/analysis-history");

  export const deleteHistory = (id) =>
  API.delete(
    `/analysis-history/${id}`
  );

  export const createGoal = (data) =>
  API.post("/goals", data);

  export const getGoals = () =>
  API.get("/goals");

  export const deleteGoal = (id) =>
  API.delete(`/goals/${id}`);

  export const analyzeGitHub = (username) =>
  API.post("/github/analyze", {
    username,
  });

  export const registerUser = (
  data
) =>
  API.post(
    "/auth/register",
    data
  );

  export const loginUser = (
  data
) =>
  API.post(
    "/auth/login",
    data
  );

export const getGithubReports = () =>
  API.get("/github/reports");

export const getRoadmapHistory = () =>
  API.get("/roadmap-history");

export const changePassword = (
  data
) =>
  API.put(
    "/settings/change-password",
    data
  );

 export const deleteAccount = () =>
  API.delete("/settings/delete-account");