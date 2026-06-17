const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post(
  "/analyze",
  async (req, res) => {
    try {
      const { username } = req.body;

      const userResponse =
        await axios.get(
          `https://api.github.com/users/${username}`
          );

      const repos =
  userResponse.data.public_repos;

const followers =
  userResponse.data.followers;

const bio =
  userResponse.data.bio;

  const strengths = [];

const improvements = [];

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

  bio:
    bio,

  githubScore:
    githubScore,

  strengths:
    strengths,

  improvements:
    improvements,
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