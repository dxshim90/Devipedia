const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth.js");
const user = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (err) {
//     console.log(err.message);
//     res.send("Server error;");
//   }
// });

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ errors: [{ message: "Invalid Input" }] });
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Email or Password" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.send("sever error");
    }
  }
);

module.exports = router;
