//import express
const express = require('express')

const usercontroller = require('../controllers/userController')
const bookcontroller = require('../controllers/bookController')
const jobcontroller = require('../controllers/jobController')

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

//Admin
route.get('/api/admin-allBooks',jwtMiddleware,bookcontroller.getAllBookAdminController )
route.put('/api/admin-approvedBook', jwtMiddleware, bookcontroller.approveBooksadminController)
route.get('/api/admin-getallusers',jwtMiddleware,usercontroller.getAllUsersAdminController)

//Jobs-Admin
route.post('/api/admin-addJobs',jwtMiddleware,jobcontroller.addJobs)
route.get('/api/admin-allJobs',jwtMiddleware,jobcontroller.getAllJobs)
route.delete('/api/admin-deleteJobs/:id', jobcontroller.deleteJobs)

//Adminprofile
route.put('/api/updateAdmin', jwtMiddleware, multerMiddleware.single('profile'), usercontroller.updateAdminDetails )

route.get('/api/admin-Details', jwtMiddleware, usercontroller.getAdminDetails)



//export the route
module.exports = route