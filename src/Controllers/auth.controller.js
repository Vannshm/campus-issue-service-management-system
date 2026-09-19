const userModel = require('../Models/user.model')
const jwt = require('jsonwebtoken')
const bcpt = require('bcrypt')

async function registerUser(req,res){
  const {username,phone,email,password,address,role='student'} = req.body;

  const isuserExist = await userModel.findOne({
    $or:[
      {phone},
      {email}
    ]
  })
  
  if(isuserExist){
    res.status(401).json({
      message:"The user already exist"
    })
  }

  const hash = await bcpt.hash(password,10)

  const user = await userModel.create({
    username,
    phone,
    email,
    password:hash,
    address,
    role
  })

  const token = jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_SEC_KEY)

  res.cookie('token',token)

  res.status(200).json({
    message:'User Registered successfully',
    user:user,
    token
  })

}


module.exports = {registerUser}