//import express
const express = require('express')
const usercontroller = require('../controllers/userController')
const bookcontroller = require('../controllers/bookController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

//create an instance
const route = new express.Router()

//API CALL FOR REGISTER
route.post('/api/register', usercontroller.register)
route.post('/api/login', usercontroller.login)
route.post('/api/google-login', usercontroller.googleAuth)
route.post('/api/addBook', jwtMiddleware, multerMiddleware.array('UploadedImage', 3), bookcontroller.addBook )
route.get('/api/homeBook', bookcontroller.getHomeBooks )
route.get('/api/allBook', jwtMiddleware, bookcontroller.getAllBooks )
route.get('/api/getABook/:id', jwtMiddleware, bookcontroller.getABook )

//export the route
module.exports = route