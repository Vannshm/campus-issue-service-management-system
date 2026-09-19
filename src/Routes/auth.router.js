const express = require('express')
const route = express.Router()
const authController = require('../Controllers/auth.controller')
const authMiddleware = require('../Middlewares/auth.middleware')

route.post('/register',authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/get-profile',authController.getUser)
route.put('/update-profile',authMiddleware.authUpdateProfile,authController.updateProfile)

module.exports=route