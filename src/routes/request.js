const express = require("express");
const requestRouter = express.Router();

const {userAuth}= require("../middlewares/auth")

const connectionRequestModel = require("../models/connectionRequest");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest= new connectionRequestModel({
            fromUserId,toUserId,status
        })
        const data = await connectionRequest.save();

        res.json({
            message: "connection request sent successfully!", // res.jspn method is used to send the message with the user
            data,
        })

    }
    catch(err){
         res.status(400).send("ERROR: "+err.message)
    }
   
    
})

module.exports = requestRouter;