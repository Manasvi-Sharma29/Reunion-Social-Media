const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const postReactionSchema = new mongoose.Schema({
    postId:{
        type: objectId,
        ref:'posts',
        required:true
    },
    likedBy:{
        type:objectId,
        required:true,
        ref:'user'
    },
    isDeleted:{
        type:Boolean,
        requried:true,
        default:false
    }
})

module.exports = mongoose.model('post_reaction',postReactionSchema)