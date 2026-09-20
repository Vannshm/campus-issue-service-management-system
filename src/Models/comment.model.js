const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  about:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'issue'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  comment:{
    type:String,
    required:true
  }
})

const commentModel = mongoose.model('comment',commentSchema)

module.exports = commentModel