const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

//Logic for API calls

//1. Register
exports.register=async(req, res)=>{
    //collect data from request body - destructuring
    const {username, email, password } = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){ //error
            res.status(401).json("User already existing...")
        }
        else{
            const newUser = new users({username, email, password})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

//2. Login
exports.login=async(req, res)=>{
    //collect data from request body - destructuring
    const {email, password } = req.body
    try{
        const existingUser = await users.findOne({email})
        if(!existingUser){ //error
            res.status(401).json("Something went wrong!")
        }
        else{
           if (existingUser.password == password) {
                //token generation
                const token = jwt.sign({userMail:existingUser.email}, 'Superkey2025')
                console.log(token);
                
                res.status(200).json({existingUser, token}); //Login success
            } 
            else {
                res.status(401).json("Incorrect password.");
            }
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

//3. Google Authentication
exports.googleAuth=async(req, res)=>{
    //collect data from request body - destructuring
    const {username, email, password, photo } = req.body
    try{
        const existingUser = await users.findOne({email})
        if(!existingUser){ 
            //first time googleAuth
            const newUser = new users({username, email, password, profile:photo})
            await newUser.save()  //save to mongoDB

            //token gen
            const token = jwt.sign({userMail: newUser.email}, 'Superkey2025')
            console.log(token);

             res.status(200).json({existingUser:newUser, token}) //login success
            
        }
        else{
                //existing user
                //token generation
                const token = jwt.sign({userMail:existingUser.email}, 'Superkey2025')
                console.log(token);
                
                res.status(200).json({existingUser, token}); //Login success
            
        }
    }
    catch(err){
        res.status(500).json(err)
    }

}


//---------------------------------ADMIN------------------------------------

exports.getAllUsersAdminController = async(req,res) =>{
    const email = req.payload.userMail
    try{
        const allExistingUsers = await users.find({email:{$ne : email}})
        res.status(200).json(allExistingUsers)

    }catch(err){
        res.status(500).json("Err" + err)
    }
}