const express = require("express");
const { connectDB } = require("./config/database")
const app = express();
const Usermodel = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

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
        res.status(400).send("something went wrong :"+ err.message)
    }
})


app.post("/signup", async (req, res) => {

   
    try {
        validateSignupData(req);
        const{firstName,lastName,emailId,password}=req.body;
        
        // encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        // creating a new instance of the usermodel
        const user = new Usermodel({
            firstName,lastName,emailId,
            password:passwordHash,
            
        });
    
        await user.save();
        res.send("user addded succesfully")
    } catch(err) {
        res.status(400).send("some error occured "+ err.message)
    }

})

app.post("/login", async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await Usermodel.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error("Invalid Credentials:password")

        }else{
            // create a JWT token
            const token = await jwt.sign({_id:user._id},"Dev123456@")

            // add the token to cookie and send the response back to the user
            res.cookie("token",token);
            res.send("Login succesfull")
        }


    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

app.get("/profile", async (req,res)=>{
try{

    const {token} = req.cookies;
    if(!token){
        throw new Error("Invalid token")
    }
    const decodedmessage = await jwt.verify(token,"Dev123456@")
    console.log(decodedmessage);
    const {_id}= decodedmessage;
    const user =  await Usermodel.findById(_id);
    if(!user){
        throw new Error("user not found")
    }
    res.send(user);
}catch(err){
    res.status(400).send("ERROR: "+ err.message);
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

app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","password","gender","skills","age"];
        const isUpdaateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(!isUpdaateAllowed){
            throw new Error("updata is not allowed")
        }
        if(data?.skills?.length >10){
            throw new Error(" max 10 skills allowed ")
        }
        const user = await Usermodel.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true})  // by default before
        res.send(user)
    }catch(err){
        res.status(400).send("update failed :"+  err.message)
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
