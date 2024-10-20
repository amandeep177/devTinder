const express = require("express");
const errorhandling = express();

errorhandling.get("/getuserData", (req,res)=>{
     
    try{
        throw new Error("asnedfckj")
     res.send("gettng data")
    }catch{
        res.status(500).send("something went wrong go to custome care")

    }
})
errorhandling.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

errorhandling.listen(4000,()=>{
    console.log("Server running on port 4000...");
    
})