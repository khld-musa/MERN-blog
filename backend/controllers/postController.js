const multer = require("multer");
const path = require("path");

const Post = require("../models/post");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//multer config
const Storage = multer.diskStorage({
  destination: "backend/controllers/postImages",
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new ErrorHandler("file type is not supported"), false);
      return;
    }
    cb(null, Date.now() + "-" + "postImages" + ext);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// Create new post   =>   /api/v1/post/new
exports.newPost = catchAsyncErrors(async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.Console.log(err);
      }

      const { text } = req.body;

      const post = await post.create({
        text,
        postImage: {
          data: req.file.filename,
        },
        user: req.user._id
      });

      res.status(200).json({
        success: true,
        post,
      });
    });
  } catch (err) {
    next(err);
  }
});

// Get all posts   =>   /api/v1/posts?keyword=apple
exports.getPosts = catchAsyncErrors(async (req, res, next) => {
  const postCount = await Post.countDocuments();

  const posts = await Post.find();

  res.status(200).json({
    success: true,
    postCount,
    posts,
  });
});

// Get single post details   =>   /api/v1/post/:id
exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Update post   =>   /api/v1/post/:id
exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    post,
  });
});

// Delete post   =>   /api/v1/post/:id
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  await post.remove();

  res.status(200).json({
    success: true,
    message: "post is deleted.",
  });
});
