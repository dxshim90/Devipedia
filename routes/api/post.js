const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const Profile = require("../../models/profile.js");
const User = require("../../models/user.js");
const { check, validationResult } = require("express-validator/check");
const Post = require("../../models/post.js");

//create a post
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//get all the posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort();
    res.json(posts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get post from id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Not post found" });
    }
    res.json(post);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete a post

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Not post found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "user not auth" });
    }

    await post.remove();

    res.json({ message: "Post Deleted" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//liking a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }
    post.likes.push({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//unlike a post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ message: "You havent liked this post" });
    }
    const removeLike = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeLike, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//adding a comment to post

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// delete a communt

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    debugger;
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ message: "comment does not exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Cannot delete another users comments" });
    }
    const commentIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
