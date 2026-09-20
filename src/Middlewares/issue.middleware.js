const jwt = require('jsonwebtoken')

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

    req.user = decoded

    next()

  }catch(err){
    return res.status(401).josn({
      message:"Something Went Wrong"
    })
  }

}

module.exports = {McreateIssue}