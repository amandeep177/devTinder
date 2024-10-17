const express = require("express");
const app = express();


app.get("/user/:id/:password",(req,res)=>{
    console.log(req.params);
    
    res.send({firsname:"amandeep", college: "jims"})
})
app.post("/user",(req,res)=>{
    res.send("data saved")
})

app.get("/*fly$", (req,res)=>{
    res.send("namaste hello regex")
})


// app.use("/", (req,res)=>{
//     res.send("welcome on dashboard")
// })


app.listen(3000,()=>{
    console.log("Server running on port 7777...");
    
})
