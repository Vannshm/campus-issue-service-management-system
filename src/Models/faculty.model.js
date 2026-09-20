const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
    unique:true
  },
  empId:{
    type:String,
    required:true,
    unique:true
  },
  department:{
    type:String,
    required:true,
    trim:true
  },
  designation:{
    type:String,
    required:true,
    trim:true
  } 
})

const facultyModel = mongoose.model('facilty',facultySchema);

module.exports = facultyModel