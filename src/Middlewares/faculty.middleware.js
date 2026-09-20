const jwt = require('jsonwebtoken')

async function MfacultyProfile(req,res,next){
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"You have to Login First"
    })
  }

  try{

    const decoded = await jwt.verify(token,process.env.JWT_SEC_KEY)

    if(decoded.role !== 'faculty'){
      return res.status(403).json({
      message:"Only faculty can access this route"
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

module.exports = {MfacultyProfile}