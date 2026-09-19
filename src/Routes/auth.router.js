const express = require('express')
const route = express.Router()
const authController = require('../Controllers/auth.controller')

route.post('/register',authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/get-profile',authController.getUser)

module.exports=route