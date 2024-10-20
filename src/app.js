const express = require("express");
const app = express();


app.get("/user",
    (req,res,next)=>{
    
        next();
    
},
 (req,res,next)=>{
    console.log("in response 2");
    
    next()
 },
 (req,res,next)=>{
     next();
     
 },
 (req,res)=>{
     res.send("Response 4")
 },
)
// app.post("/user",(req,res)=>{
//     res.send("data saved")
// })

// app.get("/*fly$", (req,res)=>{
//     res.send("namaste hello regex")
// })


// app.use("/", (req,res)=>{
//     res.send("welcome on dashboard")
// })


app.listen(3000,()=>{
    console.log("Server running on port 7777...");
    
})
