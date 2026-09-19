const express = require('express')
const route = express.Router()
const authController = require('../Controllers/auth.controller')

route.post('/register',authController.registerUser)

module.exports=route