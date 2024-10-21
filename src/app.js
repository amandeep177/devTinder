const express = require("express");
const { connectDB } = require("./config/database")
const app = express();
const Usermodel = require("./models/user")

app.use(express.json());

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId

    try {
        //    const users = await Usermodel.find({emailId: userEmail});
        const users = await Usermodel.findOne({ emailId: "mumbaicharaja@gmail.com" })
        if (!users) {
            res.status(400).send("user not found")
        } else {

            res.send(users);
        }

    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.get("/feed", async (req, res) => {


    try {
        const users = await Usermodel.find({});
        res.send(users);

    } catch (err) {
        res.status(400).send("something went wrong")
    }
})


app.post("/signup", async (req, res) => {

    // creating a new instance of the usermodel
    const user = new Usermodel(req.body);

    try {
        await user.save();
        res.send("user addded succesfully")
    } catch {
        res.status(400).send("some error occured")
    }

})

app.delete("/user", async (req,res)=>{
 
    // const userId = req.body._id
    const emailId = req.body.emailId
    try{
        // await Usermodel.findByIdAndDelete(userId);
        await Usermodel.findOneAndDelete({emailId: emailId})
        res.send("user deleted succesfully")

    }
    catch{
        res.status(400).send("some error occured")
    }
})

app.patch("/user", async (req,res)=>{
    const userId = req.body._id
    const data = req.body;
    try{
        const user = await Usermodel.findByIdAndUpdate(userId,data,{returnDocument:"after"})  // by default before
        res.send(user)
    }catch{
        res.status(400).send("some error occured")
    }

})
connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(5000, () => {
            console.log("Server running on port 5000...");

        })

    })
    .catch((err) => {
        console.error("Database cannot be connected!!")
    })
