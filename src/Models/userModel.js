const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String,
        required:true,
        default:null
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model('user',userSchema)