const express = require("express");
const axios = require("axios");
const githubHeaders = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
};

const router = express.Router();

router.post(
  "/analyze",
  async (req, res) => {
    try {
      const { username } = req.body;

      const userResponse =
  await axios.get(
    `https://api.github.com/users/${username}`,
    githubHeaders
  );

          const reposResponse =
  await axios.get(
    `https://api.github.com/users/${username}/repos`,
    githubHeaders
  );

  const totalStars =
  reposResponse.data.reduce(
    (sum, repo) =>
      sum +
      repo.stargazers_count,
    0
  );

  const topRepo =
  reposResponse.data.reduce(
    (best, current) =>
      current.stargazers_count >
      best.stargazers_count
        ? current
        : best,
    reposResponse.data[0]
  );

  const reposWithoutDescription =
  reposResponse.data.filter(
    (repo) =>
      !repo.description
  ).length;

      const repos =
  userResponse.data.public_repos;

const followers =
  userResponse.data.followers;

const bio =
  userResponse.data.bio;

  const strengths = [];

const improvements = [];

const actionPlan = [];

let githubScore = 0;

if (repos >= 20) {
  githubScore += 30;

  strengths.push(
    "Excellent repository count"
  );
}
else if (repos >= 10) {
  githubScore += 20;

  strengths.push(
    "Good repository count"
  );
}
else {
  improvements.push(
    "Create more public repositories"
  );
}

if (userResponse.data.public_repos < 5) {
  actionPlan.push(
    "Build and publish more projects on GitHub"
  );
}

if (followers >= 100) {
  githubScore += 25;

  strengths.push(
    "Strong GitHub community presence"
  );
}
else if (followers >= 50) {
  githubScore += 15;

  strengths.push(
    "Growing GitHub audience"
  );
}
else if (followers >= 10) {
  githubScore += 10;

  strengths.push(
    "Some GitHub visibility"
  );
}
else {
  improvements.push(
    "Increase profile visibility and engagement"
  );
}

if (userResponse.data.followers < 20) {
  actionPlan.push(
    "Share projects and contribute to open source to grow visibility"
  );
}

if (bio) {
  githubScore += 20;

  strengths.push(
    "Professional profile bio added"
  );
}
else {
  improvements.push(
    "Add a GitHub profile bio"
  );

  actionPlan.push(
  "Write a professional GitHub profile bio describing your skills and interests"
);
}

if (
  reposWithoutDescription >= 3
) {
  improvements.push(
    `${reposWithoutDescription} repositories are missing descriptions`
  );

  actionPlan.push(
    "Add meaningful descriptions to your repositories so recruiters can quickly understand your projects"
  );
}
githubScore += 25;

console.log(githubScore);

   res.status(200).json({
  username:
    userResponse.data.login,

  name:
    userResponse.data.name,

  avatar:
  userResponse.data.avatar_url,

  publicRepos:
    repos,

  followers:
    followers,

  totalStars:
    totalStars,

  topRepo: {
  name:
    topRepo?.name,

  stars:
    topRepo?.stargazers_count,

  language:
    topRepo?.language,
},

  bio:
    bio,

  githubScore:
    githubScore,

  strengths:
    strengths,

  improvements:
    improvements,

  actionPlan:
    actionPlan,
});
    
      } catch (error) {
        console.error(error);

        res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;