const postReactionModel = require("../Models/postReactionModel")

const like = async function(req,res){
    try{
        let postId = req.params.id 
        let likedBy = req.token.userId
        let alreadyExists = await postReactionModel.findOneAndUpdate({postId:postId,likedBy:likedBy},{$set:{isDeleted:false}})
        if(!alreadyExists){
            let obj = {
                postId:postId,
                likedBy:likedBy
            }
            await postReactionModel.create(obj)
        }
        return res.status(201).send({status:true,message:"You Liked this post"})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}


const unlike = async function(req,res){
    try{
        let postId = req.params.id 
        let likedBy = req.token.userId
        let data = await postReactionModel.findOneAndUpdate({postId:postId,likedBy:likedBy,isDeleted:false},{$set:{isDeleted:true}})
        return res.status(200).send({status:true,message:"You unLiked this post"})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}
module.exports = {like,unlike}