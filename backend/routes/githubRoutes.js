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

let githubScore = 0;

if (repos >= 20)
  githubScore += 30;
else if (repos >= 10)
  githubScore += 20;
else if (repos >= 5)
  githubScore += 10;

if (followers >= 100)
  githubScore += 25;
else if (followers >= 50)
  githubScore += 15;
else if (followers >= 10)
  githubScore += 10;

if (bio)
  githubScore += 20;

githubScore += 25;

console.log(githubScore);

      res.status(200).json({
  username:
    userResponse.data.login,

  name:
    userResponse.data.name,

  publicRepos:
    repos,

  followers:
    followers,

  bio:
    bio,

  githubScore:
    githubScore,
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