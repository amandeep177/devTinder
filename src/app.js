const express = require("express");
const { connectDB } = require("./config/database")
const app = express();
const Usermodel = require("./models/user")
const {validateSignupData} = require("./utils/validation")

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId

//     try {
//         //    const users = await Usermodel.find({emailId: userEmail});
//         const users = await Usermodel.findOne({ emailId: "mumbaicharaja@gmail.com" })
//         if (!users) {
//             res.status(400).send("user not found")
//         } else {

//             res.send(users);
//         }

//     } catch (err) {
//         res.status(400).send("something went wrong")
//     }
// })

// app.get("/feed", async (req, res) => {


//     try {
//         const users = await Usermodel.find({});
//         res.send(users);

//     } catch (err) {
//         res.status(400).send("something went wrong :"+ err.message)
//     }
// })







// app.delete("/user", async (req,res)=>{
 
//     // const userId = req.body._id
//     const emailId = req.body.emailId
//     try{
//         // await Usermodel.findByIdAndDelete(userId);
//         await Usermodel.findOneAndDelete({emailId: emailId})
//         res.send("user deleted succesfully")

//     }
//     catch{
//         res.status(400).send("some error occured")
//     }
// })

// app.patch("/user/:userId", async (req,res)=>{
//     const userId = req.params?.userId
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES = ["photoUrl","about","password","gender","skills","age"];
//         const isUpdaateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
//         if(!isUpdaateAllowed){
//             throw new Error("updata is not allowed")
//         }
//         if(data?.skills?.length >10){
//             throw new Error(" max 10 skills allowed ")
//         }
//         const user = await Usermodel.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true})  // by default before
//         res.send(user)
//     }catch(err){
//         res.status(400).send("update failed :"+  err.message)
//     }

// })

connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(5000, () => {
            console.log("Server running on port 5000...");

        })

    })
    .catch((err) => {
        console.error("Database cannot be connected!")
    })
