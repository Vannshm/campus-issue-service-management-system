const userModel = require('../Models/user.model')
const issueModel = require('../Models/issue.model')

async function viewAllIssues(rerq,res){

  const allIssues = await issueModel.find()

  if(allIssues.length === 0){
    return res.status(404).json({
      message:'no issue found'
    })
  }

  res.status(200).json({
    message:'issues fetched sucessfully',
    allIssues
  })

}

async function changeUserRole(req,res){
  
  try{

  const userId = req.params.id
  const {role} = req.body

  if(!['student','faculty','admin'].includes(role)){
    return res.status(400).json({
      message:'invalid role'
    })
  }

  const user = await userModel.findByIdAndUpdate(userId,{
    role : role
  },{new:true})

  if(!user){
    return res.status(404).json({
      message:'user not found'
    })
  }

  res.status(200).json({
    message:'user role updated sucessfully',
    user
  })

  }catch(err){
    console.log(err)
    return res.status(401).json({
      message:'something went wrong'
    })
  }

}

module.exports = {
  changeUserRole,
  viewAllIssues
}