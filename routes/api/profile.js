const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const profile = require("../../models/profile.js");
const user = require("../../models/user.js");
const { check, validationResult } = require("express-validator/check");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ message: "No profile found " });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required")
        .not()
        .isEmpty(),
      check("skills", "skills are required")
        .not()
        .isEmpty(),
      check("githubusername", "Git Hub Username is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    const profileContents = {};
    profileContents.user = req.user.id;

    if (company) profileContents.company = company;
    if (website) profileContents.website = website;
    if (location) profileContents.location = location;
    if (bio) profileContents.bio = bio;
    if (status) profileContents.status = status;
    if (githubusername) profileContents.githubusername = githubusername;
    if (skills) {
      profileContents.skills = skills.split(",").map(skill => skill.trim());
      console.log(profileContents);
    }
  }
);

module.exports = router;
