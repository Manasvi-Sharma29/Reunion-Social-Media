const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postId:{
        type:String,
        requried:true
    },
    title:{
        type:String,
        requried:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        requried:true
    },
    createdTime:{
        type:String,
        requried:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model('post',postSchema)