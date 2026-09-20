const express = require('express')
const route = express.Router()
const authController = require('../Controllers/auth.controller')
const authMiddleware = require('../Middlewares/auth.middleware')
const issueMiddleware = require('../Middlewares/issue.middleware')
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

route.post('/register',authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/get-profile',authController.getUser)
route.put('/update-profile',authMiddleware.authUpdateProfile,authController.updateProfile)
route.post('/create-issue',upload.single('image'),issueMiddleware.McreateIssue,authController.createIssue)
route.get('/viewMy-issues',issueMiddleware.McreateIssue,authController.viewMyIssue)

module.exports=route