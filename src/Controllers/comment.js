const commentModel = require("../Models/commentModel")

const comment = async function(req,res){
    try{
        let comment = req.body.comment
        let commentedBy = req.token.userId 
        let postId = req.params.id 
        let obj = {
            comment:comment,
            commentedBy:commentedBy,
            postId:postId,
            commentedAt:Date.now()
        }
        let data = await commentModel.create(obj)
        return res.status(201).send({status:true,comment:data._id})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

module.exports = {comment}