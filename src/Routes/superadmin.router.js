const express = require('express')
const route = express.Router()
const superadminMiddleware = require('../Middlewares/speradmin.middleware')
const superadminController = require('../Controllers/superadmin.controller')

route.put('/update-role/:id',superadminMiddleware.MsuperadminProfile,superadminController.changeUserRole)
route.get('/viewAllIssues',superadminMiddleware.MsuperadminProfile,superadminController.viewAllIssues)
route.get('/viewAllUsers',superadminMiddleware.MsuperadminProfile,superadminController.viewAllUsers)
route.get('/viewAllFaculty',superadminMiddleware.MsuperadminProfile,superadminController.viewAllFaculty)
route.put('/blockUser/:id',superadminMiddleware.MsuperadminProfile,superadminController.blockUser)
route.delete('/deleteUser/:id',superadminMiddleware.MsuperadminProfile,superadminController.deleteUser)
route.get('/priorityIssue/:priority',superadminMiddleware.MsuperadminProfile,superadminController.viewIssueByPrority)

module.exports = route