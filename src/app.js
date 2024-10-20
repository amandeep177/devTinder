const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const Usermodel = require("./models/user")


app.post("/signup", async (req,res)=>{

    // creating a new instance of the usermodel
    const user = new Usermodel({
        firstName:"virat",
        lastName : "kohli",
        emailId : "firaniboy@gmail.com",
        password : "mereanushka",
    });

    try{
        await user.save();
        res.send("user addded succesfully")
    }catch{
        res.status(400).send("some error occured")
    }

})

connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(5000,()=>{
            console.log("Server running on port 5000...");
            
        })

    })
    .catch((err) => {
        console.error("Database cannot be connected!!")
    })
