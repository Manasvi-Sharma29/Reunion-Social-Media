const mongoose = require("mongoose");
const followersModel = require("../Models/followersModel");
const userModel = require('../Models/userModel')
const ObjectId = mongoose.Types.ObjectId
const profile = async function (req, res) {
  try {
    let userId = req.token.userId;
    let userName = req.token.userName
    var options = {
      allowDiskUse: false
  };
  
    let pipeline = [
      {
        $lookup: {
          from : "followers",
          localField: "_id",
          foreignField: "userId",
          as: "followers_list"
        }
      },
      {
        $match:{
          _id: ObjectId(userId),
          isDeleted:false
        }
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "followerUserId",
          as: "following_list"
        }
      },
      {
        $addFields: {
          followers: {
            $size: "$followers_list",
          },
        },
      },
      {
        $addFields: {
          following: {
            $size: "$following_list",
          },
        },
      },
      {
        $project:{
          _id:0,
          userName:1,
          followers:1,
          following:1
        }
      }
    ]
 
    let profile =  await userModel.aggregate(pipeline,options)
    console.log(profile);
    return res.status(200).send({ status: true, profile: profile});
  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports = { profile };
