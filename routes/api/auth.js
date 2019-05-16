const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const user = require("../../models/user.js");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.send("Server error;");
  }
});

module.exports = router;
