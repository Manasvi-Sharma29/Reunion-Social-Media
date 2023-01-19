const postModel = require("../Models/postModel");
const shortId = require("shortid");
const postReactionModel = require("../Models/postReactionModel");
const commentModel = require("../Models/commentModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const post = async function (req, res) {
  try {
    const { title, description } = req.body;
    let createdBy = req.token.userId;
    let createdTime = new Date(new Date().toUTCString());
    if (!title) {
      return res.status(400).send({ status: false, me });
    }
    let post = {
      postId: shortId.generate(),
      title: title,
      description: description,
      createdBy: createdBy,
      createdTime: createdTime,
    };
    let newPost = await postModel.create(post);
    delete newPost._doc["createdBy"];
    delete newPost._doc["isDeleted"];
    delete newPost._doc["__v"];
    delete newPost._doc["_id"];
    return res.status(201).send({ status: true, post: newPost });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

const deletePost = async function (req, res) {
  try {
    let postId = req.params.id;
    let deletedPost = await postModel.findOneAndUpdate(
      { _id: postId, isDeleted: false, createdBy: req.token.userId },
      { $set: { isDeleted: true } }
    );
    if (!deletedPost) {
      return res.status(404).send({ status: false, message: "Post not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

const getPost = async function (req, res) {
  try {
    let postId = req.params.id;
    const pipeline = [
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "no_of_likes",
        },
      },
      {
        $match: {
          _id: ObjectId(postId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "no_of_comments",
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$no_of_likes",
          },
        },
      },
      {
        $addFields: {
          commentsCount: {
            $size: "$no_of_comments",
          },
        },
      },
      {
        $project: {
          _id: 1.0,
          title: 1.0,
          description: 1.0,
          createdTime: 1.0,
          commentsCount: 1.0,
          likesCount: 1.0,
        },
      },
    ];
    let post = await postModel.aggregate(pipeline);

    return res.status(200).send({ status: true, post: post });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

const getAllPost = async function (req, res) {
  try {
    let userId = req.token.userId;

    var pipeline = [
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments_list",
        },
      },
      {
        $match: {
          createdBy: ObjectId(userId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "post_reactions",
          localField: "_id",
          foreignField: "postId",
          as: "no_of_likes",
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$no_of_likes",
          },
        },
      },
      {
        $project: {
          _id: 1.0,
          title: 1.0,
          description: 1.0,
          createdTime: 1.0,
          "comments_list.comment": 1.0,
          "comments_list.commentedBy": 1.0,
          likesCount: 1.0,
        },
      },
    ];

    var post = await postModel.aggregate(pipeline);

    // console.log(post);
    return res.status(200).send({ status: true, post });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports = { post, deletePost, getPost, getAllPost };
