//import dotenv file
require('dotenv').config()

//1. import express
const express = require('express')

//5. import cors
const cors = require('cors')

//8. import express
const route = require('./router/route')

//import db
const db = require('./config/db')

// //import appMiddleware
// const appmiddleware = require('./middleware/appmiddleware')
//2. Create a server app using express
const bookServer = express()

//6. implementing cors
bookServer.use(cors())

//7. implementing middleware
bookServer.use(express.json())
// bookServer.use(appmiddleware)
bookServer.use(route)

//3. Define port
PORT = 3000 || process.env.PORT

//4. Server listen
bookServer.listen(PORT, ()=>{
    console.log("Book Server Listening on the port", PORT);
    
})

