const express = require("express");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation")

const {userAuth}= require("../middlewares/auth")

profileRouter.get("/profile/view", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
        // console.log(req.params);
        
    }catch(err){
        res.status(400).send("error: "+ err.message);
    }
        
    })

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid edit request");
        }
        const loggedInUser = req.user;  // this user is taken from userauth
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key)=> (loggedInUser[key]= req.body[key]))
        console.log(loggedInUser);
        res.send(` ${loggedInUser.firstName}  your profile updated succesfully`);

        
        
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
  

})    

    module.exports = profileRouter;