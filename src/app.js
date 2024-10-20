const express = require("express");
const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

app.get("/user/login",    // i fo not require auth for login
    (req,res,next)=>{
    
       res.send(" logging in")
    
})

app.get("/user", userAuth,
    (req,res,next)=>{
    
       res.send(" response of user")
    
})

app.use("/admin",adminAuth)

app.use("/admin",(req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised request")
    }else{
        next();
    }
})

app.get("/admin/getAllData",(req,res )=>{
    res.send(" getting the data")
})

app.get("/admin/deleteAllData",(req,res)=>{
    res.send("deleting the data")
})

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
