const express = require("express");
const router = express.Router();

const {
  getPosts,
  newPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/posts").get(getPosts);
router.route("/post/:id").get(getSinglePost);

router.route("/post/new").post(isAuthenticatedUser, newPost);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, updatePost)
  .delete(isAuthenticatedUser, deletePost);

module.exports = router;
