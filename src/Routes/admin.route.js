const express = require('express')
const route = express.Router()
const adminMiddleware = require('../Middlewares/admin.middleware')
const adminController =require('../Controllers/admin.controller')

route.put('/admin-profile',adminMiddleware.MadminProfile,adminController.adminProfile)

module.exports = route