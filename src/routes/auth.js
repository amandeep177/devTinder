const express = require("express");
const authRouter = express.Router();

const Usermodel = require("../models/user")
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {

   
    try {
        validateSignupData(req);
        const{firstName,lastName,emailId,password,age,gender}=req.body;
        
        // encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        // creating a new instance of the usermodel
        const user = new Usermodel({
            firstName,lastName,emailId,age,gender,
            password:passwordHash,
            
        });
    
        await user.save();
        res.send("user addded succesfully")
    } catch(err) {
        res.status(400).send("some error occured "+ err.message)
    }

})

authRouter.post("/login", async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await Usermodel.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password)  // custom method created in user.js file
        if(!isPasswordValid){
            throw new Error("Invalid Credentials:password")

        }else{
            // create a JWT token
            const token = await user.getJWT();

            // add the token to cookie and send the response back to the user
            res.cookie("token",token 
                , {expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                     });
            res.send("Login succesfull")
        }


    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

authRouter.post("/logout", async (req,res)=>{
    try{

        // res.clearCookie('token', {
        //     httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        //     secure: true,   // Ensures the cookie is sent over HTTPS only
        //     sameSite: 'Strict', // Restricts cross-site requests
        // });

        res.cookie("token",null
            , {expires: new Date(Date.now()) // cookie will be removed just now
        });
        res.send("loggedout successfully")
    }
    catch(err){
        res.status(400).send( "error: "+ err);

    }
})

module.exports = authRouter;
