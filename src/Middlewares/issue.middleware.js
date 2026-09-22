const jwt = require('jsonwebtoken')
const userModel = require('../Models/user.model')


async function McreateIssue(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"You have to Login First"
    })
  }

  try{

    const decoded = await jwt.verify(token,process.env.JWT_SEC_KEY)
    if(!decoded){
        return res.status(401).josn({
      message:"Unauthorised"
    })
    }
    
    const user = await userModel.findById(decoded.id)

    if(user.isBlocked){
    return res.status(400).json({
      message:'Your account has been blocked'
    })
  }

    req.user = decoded

    next()

  }catch(err){
    return res.status(401).json({
      message:"Something Went Wrong"
    })
  }

}

module.exports = {McreateIssue}