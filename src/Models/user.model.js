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
    type:email,
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
  }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel