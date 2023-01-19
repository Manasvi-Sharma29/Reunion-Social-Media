const mongoose = require('mongoose')
const objectId =  mongoose.Schema.Types.ObjectId

const followerSchema = new mongoose.Schema({
    userId:{
        type:objectId,
        ref: 'user',
        required:true
    },
    followerUserId:{
        type:objectId,
        ref: 'user',
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('follower',followerSchema)