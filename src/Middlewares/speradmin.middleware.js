const jwt = require('jsonwebtoken')

async function MsuperadminProfile(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:'Unauthorised'
    })
  }

  try{

    const decoded = await jwt.verify(token,process.env.JWT_SEC_KEY)

    if(decoded.role !== 'superadmin'){
      return res.status(401).json({
      message:'Only superadmin can access this route'
    })
    }

    req.user = decoded

    next()

  }catch(err){
    console.log(err)
    return res.status(401).json({
      message:'Unauthorised'
    })
  }
}

module.exports = {MsuperadminProfile}