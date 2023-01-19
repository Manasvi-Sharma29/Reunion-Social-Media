const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId


const commentSchema = new mongoose.Schema({
    postId:{
        type:objectId,
        ref:'posts',
        required:true  
    },
    commentedBy:{
        type:objectId,
        ref:'user',
        requried:true
    },
    comment:{
        type:String,
        required:true
    },
    commentedAt:{
        type:Date,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model('comment',commentSchema)