const express = require('express')
const route = express.Router()
const adminMiddleware = require('../Middlewares/admin.middleware')
const adminController =require('../Controllers/admin.controller')
const superadminController = require('../Controllers/superadmin.controller')

route.put('/admin-profile',adminMiddleware.MadminProfile,adminController.adminProfile)
route.get('/viewAllUsers',adminMiddleware.MadminProfile,superadminController.viewAllUsers)
route.get('/viewAllFaculty',adminMiddleware.MadminProfile,superadminController.viewAllFaculty)
route.get('/viewAllIssues',adminMiddleware.MadminProfile,superadminController.viewAllIssues)
route.get('/viewIssuesNotAssigned',adminMiddleware.MadminProfile,superadminController.viewIssuesNotAssinged)
route.put('/assignedIssue/:id',adminMiddleware.MadminProfile,superadminController.assignedIssue)
route.put('/blockUser/:id',adminMiddleware.MadminProfile,superadminController.blockUser)
route.delete('/deleteUser/:id',adminMiddleware.MadminProfile,superadminController.deleteUser)
route.get('/priorityIssue/:priority',adminMiddleware.MadminProfile,superadminController.viewIssueByPrority)
route.get('/statistics',adminMiddleware.MadminProfile,superadminController.systemStatistics)

module.exports = route