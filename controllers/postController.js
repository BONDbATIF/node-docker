const Post = require("../models/postModels");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "sucess",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json({
      status: "sucess",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      result: posts.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
