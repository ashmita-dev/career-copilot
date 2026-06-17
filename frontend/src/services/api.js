import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

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

  export const createGoal = (data) =>
  API.post("/goals", data);

  export const getGoals = () =>
  API.get("/goals");

  export const deleteGoal = (id) =>
  API.delete(`/goals/${id}`);