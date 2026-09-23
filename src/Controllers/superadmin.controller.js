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

async function viewAllUsers(req,res){
  
  try{

    const users = await userModel.find()
    if(users.length === 0){
      return res.status(400).json({
        message:'no user found!'
      })
    }

    res.status(200).json({
      message:'users fetched sucessfully',
      users
    })

  }catch(err){
    consol.log(err)
    return res.status(401).json({
      message:'something went wrong!'
    })
  }

}

async function viewAllFaculty(req,res){
  
  try{

    const users = await userModel.find({role:'faculty'})
    if(users.length === 0){
      return res.status(404).json({
        message:'no user found!'
      })
    }

    res.status(200).json({
      message:'users fetched sucessfully',
      users
    })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      message:'something went wrong!'
    })
  }

}

async function blockUser(req,res){
  
  try{

    const user = req.params.id
    const block = await userModel.findByIdAndUpdate(user,
      {
        isBlocked:true
      },{new:true})

      if(!block){
        return res.status(400).json({
      message:'not a valid user'
      })
      }

     return res.status(200).json({
        message:'user blocked sucessfully!',
        block
      })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      message:'something went wrong!'
    })
  }

}

async function deleteUser(req,res){
  
  try{

    const user = req.params.id
    const deleteUser = await userModel.findByIdAndDelete(user)

      if(!deleteUser){
        return res.status(400).json({
      message:'not a valid user'
      })
      }

     return res.status(200).json({
        message:'user deleted sucessfully!',
        deleteUser
      })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      message:'something went wrong!'
    })
  }

}

async function viewIssueByPrority(req,res){

  try{

      const priority = req.params.priority
      const priorityIssue = await issueModel.find({priority:priority})
      if(priorityIssue.length === 0){
        return res.status(404).json({
          message:'no issue found'
        })
      }

      return res.status(200).json({
        message:'issue fetched sucessfully',
        priorityIssue
      })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      message:'something went wrong'
    })
  }
  
}

async function systemStatistics(req,res){
  
try{

  const totalUser = await userModel.countDocuments()

  const totalStudents = await userModel.countDocuments({role:'student'})

  const totalFaculty = await userModel.countDocuments({role:'faculty'})

  const totalAdmins = await userModel.countDocuments({role:'admin'})

  const blockedUser = await userModel.countDocuments({isBlocked:true})

  const totalIssues = await issueModel.countDocuments()

  const totalOpenIssues = await issueModel.countDocuments({status:'open'})

  const totalInProcessIssues = await issueModel.countDocuments({status:'in-progress'})

  const totalResolvedIssues = await issueModel.countDocuments({status:'resolved'})

  const totalClosedIssues = await issueModel.countDocuments({status:'closed'})

  return res.status(200).json({
    message:'System statistics fetched successfully',
    users:{
      total:totalUser,
      Students:totalStudents,
      faculty:totalFaculty,
      admin:totalAdmins,
      blocked:blockedUser
    },
    issues:{
      total:totalIssues,
      openIssues:totalOpenIssues,
      processIssues:totalInProcessIssues,
      resolvedIssues:totalResolvedIssues,
      closedIssues:totalClosedIssues
    }
  })

}catch(err){
  console.log(err)
  return res.status(500).json({
    message:'something went wrong'
  })
}


}


module.exports = {
  changeUserRole,
  viewAllIssues,
  viewAllUsers,
  viewAllFaculty,
  blockUser,
  deleteUser,
  viewIssueByPrority,
  systemStatistics
}