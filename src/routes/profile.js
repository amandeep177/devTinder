const express = require("express");
const profileRouter = express.Router();

const {userAuth}= require("../middlewares/auth")

profileRouter.get("/profile/:userId", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
        console.log(req.params);
        
    }catch(err){
        res.status(400).send("error: "+ err.message);
    }
        
    })

    module.exports = profileRouter;