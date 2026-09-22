const jwt = require('jsonwebtoken')

async function authUpdateProfile(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(200).json({
      message:"you have to login first"
    })
  }

  try{

    const decoded = jwt.verify(token,process.env.JWT_SEC_KEY)



  req.user = decoded

  next()

  }catch(err){
    return res.status(200).json({
      message:"something went wrong"
    })
  }

}


module.exports = {authUpdateProfile}