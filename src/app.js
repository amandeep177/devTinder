const express = require("express");
const app = express();

// app.use("/", (req,res)=>{
//     res.send("welcome on dashboard")
// })
app.use("/hellow", (req,res)=>{
    res.send("namaste hello")
})

app.use("/test", (req,res)=>{
    res.send("test test test")
})


app.listen(3000,()=>{
    console.log("Server running on port 7777...");
    
})
