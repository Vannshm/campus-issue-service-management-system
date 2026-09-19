const mongoose = require('mongoose')

async function connectDB(){

  try{
     const connect = await mongoose.connect(process.env.MONGODB_URL)
  console.log('DB connected sucessfully')
  return connect
  }catch(err){
    console.log(err)
  }
}

module.exports=connectDB