const jwt = require('jsonwebtoken')

const userModel = require('../Models/userModel')

const login = async function(req,res){
    try{
        let {email, password} =  req.body
        if(!email){
            return res.status(400).send({status:false,message:"Email is required"})
        }
        
        if(!password){
            return res.status(400).send({status:false,message:"Password is required"})
        }
      
        let user = await userModel.findOne({email:email,password:password})
        let token = jwt.sign(
            {
                userName: user.userName,
               userId: user._id
            },"dgetujho^%$#3240098",
            {expiresIn:"24h"}
        )
        return res.status(200).send({status:true,token:token})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

module.exports = {login}