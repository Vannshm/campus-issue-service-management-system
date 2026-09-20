const express = require('express')
const route = express.Router()
const authController = require('../Controllers/auth.controller')
const authMiddleware = require('../Middlewares/auth.middleware')
const issueMiddleware = require('../Middlewares/issue.middleware')
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

route.post('/register',authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/logout',authController.logoutUser)
route.post('/get-profile',authController.getUser)
route.put('/update-profile',authMiddleware.authUpdateProfile,authController.updateProfile)
route.post('/create-issue',upload.single('image'),issueMiddleware.McreateIssue,authController.createIssue)
route.get('/viewMy-issues',issueMiddleware.McreateIssue,authController.viewMyIssue)
route.get('/view-issue/:id',issueMiddleware.McreateIssue,authController.viewOneIssue)
route.put('/update-issue/:id',issueMiddleware.McreateIssue,authController.updateIssue)
route.delete('/delete-issue/:id',issueMiddleware.McreateIssue,authController.deleteIssue)
route.post('/comment-issue/:id',issueMiddleware.McreateIssue,authController.commentIssue)

module.exports=route