const userModel = require('../Models/user.model')
const issueModel = require('../Models/issue.model')
const {uploadFile} = require('../Services/storage.service')
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

async function logoutUser(req,res){
  res.clearCookie('token')
  res.status(200).json({
    message:'user loged out sucessfully'
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

async function createIssue(req,res){
  try{

    const {about='other',title,description,priority,status,assingedTo} = req.body
    const file = req.file

  let url

  if(file){
    const result = await uploadFile(file.buffer.toString('base64'))
    url = result.url
  }


  const issue = await issueModel.create({
    about,
    url,
    title,
    description,
    priority,
    status,
    user:req.user.id,
    assingedTo
  })

  res.status(200).json({
    message:'Issue uploded sucessfully',
    issue
  })

  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"something went wrong"
    })
  }
}

async function viewMyIssue(req,res){
    const myIssues = await issueModel.find({user:req.user.id})

    if(myIssues.length === 0){
      return res.status(404).json({
        message:'No issues found'
      })
    }

    res.status(200).json({
      message:"issues found sucessfully",
      myIssues
    })
    
}

async function viewOneIssue(req,res){
  const issue = await issueModel.findOne({
    _id:req.params.id,
    user:req.user.id
  })

  if(!issue){
    return res.status(404).json({
        message:'No issues found'
      })
  }

  res.status(200).json({
    message:'issue found sucessfully',
    issue
  })

}

async function updateIssue(req,res){

  const updatedIssue = await issueModel.findOneAndUpdate(
    {
      _id:req.params.id,
      user:req.user.id
    },
  {
    $set:req.body
  },
{returnDocument:'after'})

if(!updatedIssue){
  return res.status(401).json({
    message:'issue not found!'
  })
}

  res.status(200).json({
    message:'issue updated sucessfully',
    updatedIssue
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateProfile,
  createIssue,
  viewMyIssue,
  viewOneIssue,
  updateIssue
}