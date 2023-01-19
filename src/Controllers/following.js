const followersModel = require('../Models/followersModel')

const follow = async function(req,res){
    try{
        let userId = req.params.id
        let follower = req.token.userId
        let alreadyExists = await followersModel.findOne({userId:userId, followerUserId:follower, isDeleted:false})
        if(alreadyExists){
            return res.status(400).send({status:false,message:"already following this user"})
        }
        let obj = {}
        obj.userId = userId
        obj.followerUserId = follower
        let result = await followersModel.create(obj)
        return res.status(201).send({status:true,data:result})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

const unfollow = async function(req,res){
    try{
        let userId = req.params.id
        let followerUserId = req.token.userId
        let data = await followersModel.findOneAndUpdate({userId:userId, followerUserId:followerUserId, isDeleted:false},{$set:{isDeleted:true}})
        if(!data){
            return res.status(400).send({status:false,message:"Not following this user"})
        }
        return res.status(200).send({status:true,message:"unfollowed this user"})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

module.exports = {follow,unfollow}