const Post = require("../models/post");
const User = require("../models/user");

module.exports.getPost = async (req, res) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Success!!", data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.getPosts = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const total = await Post.countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    if (!posts) {
      return res.status(400).json({ message: "No Posts found" });
    }

    res.status(200).json({
      message: "Successfully Fetched",
      data: posts,
      pagination: {
        total: total,
        currentPage: currentPage,
        nextPage: currentPage + 1,
        previousPage: currentPage - 1,
        hasNextPage: currentPage * perPage < total,
        hasPreviousPage: currentPage > 1,
        lastpage: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const image = req.file;
  const content = req.body.content;
  const imageURL = "";
  console.log(req.file);
  if (image) {
    imageURL = image.path;
  }
  try {
    const post = new Post({
      title: title,
      image: imageURL,
      content: content,
      creator: req.id
    });
    await post.save();

    const user = await User.findById(req.id);
    user.posts.push(post);

    await user.save();

    res.status(200).json({ data: post, message: "SuccessFully Stored!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.updatePost = async (req, res) => {
  const id = req.params.postId;
  const title = req.body.title;
  // const image = req.file;
  const content = req.body.content;
  const imageURL = null;
  // if (image) {
  //   imageURL = image.path;
  // }
  // if (!imageURL) {
  //   return res.status(400).json({ message: "No File Picked!!" });
  // }
  try {
    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({ message: "Not found" });
    }

    if(post.creator.toString() === req.id) {
      return res.status(403).json({ disabled: true, message: "Not Possible!!!" });
    }

    post.title = title;
    post.image = imageURL;
    post.content = content;
    await post.save();

    res.status(200).json({ data: post, message: "Post Updated!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.deletePost = async (req, res) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({ message: "Not found" });
    }

    await Post.findByIdAndDelete(id);

    const user = await User.findById(req.id);
    user.posts.pull(id);

    await user.save();

    res.status(200).json({ message: "SuccessFully Deleted!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
