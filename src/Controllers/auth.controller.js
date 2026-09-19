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

async function loginUser(req,res){
  const {email,phone,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {email},
      {phone}
    ]
  })

  if(!user){
    return res.status(401).json({
      message:"Invalid Cradintials"
    })
  }

  const isPassValid = await bcpt.compare(password,user.password)

  if(!isPassValid){
    return res.status(401).json({
      message:"Invalid Password"
    })
  }

  const token = jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_SEC_KEY)

  res.cookie('token',token)

  res.status(200).json({
    message:"User login sucessfull",
    user:user,
    token
  })

}

async function getUser(req,res){
  const {username} = req.body

  const user = await userModel.find({
    username
  })

  if(!user){
    return res.status(401).json({
      message:'the user not found'
    })
  }

  res.status(200).json({
    message:'user found sucsessfully',
    user:user
  })

}

async function updateProfile(req,res){
  const userId = req.user.id

  const {username,address} = req.body

  const updateUser = await userModel.findByIdAndUpdate(userId,{
    username,
    address
  },{new:true});

  res.status(200).json({
    message:"User Updated Sucsessfully",
    user:updateUser
  });

};

module.exports = {registerUser,loginUser,getUser,updateProfile}