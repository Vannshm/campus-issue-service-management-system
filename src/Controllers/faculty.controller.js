const facultyModel = require('../Models/faculty.model')

async function facultyProfile(req,res){
  const {empId,department,designation} = req.body

  const facultyExist = await facultyModel.findOne({
    $or:[
      {empId},
      {userId : req.user._id}
    ]
  })

  if(facultyExist){
    return res.status(409).json({
      message:"faculty already exists"
    })
  }

  const faculty = await facultyModel.create({
    userId:req.user.id,
    empId,
    department,
    designation
  })

  res.status(200).json({
    message:'Faculty profile created sucessfully',
    faculty
  })

}

module.exports = {facultyProfile}