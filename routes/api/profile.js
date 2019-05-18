const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const profile = require("../../models/profile.js");
const user = require("../../models/user.js");
const { check, validationResult } = require("express-validator/check");

//get a profile
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

//update a profile
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
    }
    profileContents.social = {};
    if (youtube) profileContents.social.youtube = youtube;
    if (twitter) profileContents.social.twitter = twitter;
    if (facebook) profileContents.social.facebook = facebook;
    if (instagram) profileContents.socual.instagram = instagram;
    if (linkedin) profileContents.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileContents },
          { new: true }
        );
        return res.json(profile);
      }
      //creating a profile
      profile = new Profile(profileContents);
      await profile.save();
      res.json(profile);
      console.log(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

//fetch all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name");
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//get profile by user
router.get("/user/:user_id", async (req, res) => {
  try {
    debugger;
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", "name");

    if (!profile) return res.status(400).json({ message: "No profile found" });
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Server error");
  }
});

module.exports = router;
