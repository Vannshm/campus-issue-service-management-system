const facultyModel = require('../Models/faculty.model')

async function adminProfile(req,res){
  const {department,designation} = req.body

  const adminExist = await facultyModel.findOne({userId : req.user.id})

  if(adminExist){
    return res.status(409).json({
      message:"faculty already exists"
    })
  }

  const admin = await facultyModel.create({
    userId:req.user.id,
    department,
    designation
  })

  res.status(200).json({
    message:'Faculty profile created sucessfully',
    adminId:admin._id,
    admin
  })

}

module.exports = {adminProfile}