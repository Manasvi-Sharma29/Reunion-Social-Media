// const {login} = require('../Controllers/login')
const jwt = require('jsonwebtoken')
const authentication = async function(req,res,next){
    try{
        let token = req.headers["authorization"] || req.headers["Authorization"]
        if(!token){
            return res.status(401).send({status:false,message:"You're not logged in"})
        }
        token = token.split(" ")[1]
        jwt.verify(token,"dgetujho^%$#3240098",function (error, decoded){
            if(error){
                return res.status(401).send({status:false,message:"You're not logged in"})
            }else{
                req.token = decoded
                next()
            }
        })
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

module.exports = {authentication}