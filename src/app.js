require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRoute = require('./Routes/auth.router')
const facultyRoute = require('./Routes/faculty.route')
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/faculty',facultyRoute)

module.exports=app