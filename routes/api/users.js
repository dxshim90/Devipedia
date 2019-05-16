const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least six characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User already registered" }] });
      }
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

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
