const mongoose = require('mongoose')
const { applyTimestamps } = require('./user.model')

const issueSchema = mongoose.Schema({
  about:{
    type:String,
    enum:["academic","technical","hostel","library","infrastructure","administrative","other"],
    default:'other'
  },
  url:{
    type:String,
    trim:true
  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  priority:{
    type:String,
    enum:['low','medium','high','critical'],
    default:'medium'
  },
  status:{
    type:String,
    enum:['open','in-progress','resolved','closed'],
    default:'open'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  assingedTo:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'user',
     default:null
  }
},{ timestamps: true })

const issueModel = mongoose.model('issue',issueSchema)

module.exports = issueModel