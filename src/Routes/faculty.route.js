const express = require('express')
const route = express.Router()
const facultyMiddleware = require('../Middlewares/faculty.middleware')
const facultyController = require('../Controllers/faculty.controller')

route.post('/faculty-profile',facultyMiddleware.MfacultyProfile,facultyController.facultyProfile)

module.exports = route