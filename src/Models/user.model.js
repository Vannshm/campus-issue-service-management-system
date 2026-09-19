const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String
  },
  role:{
    type:String,
    enum:['student','faculty','admin'],
    default:'student'
  }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel