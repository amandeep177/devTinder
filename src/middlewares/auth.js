const Usermodel = require("../models/user")
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next)=>{
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
        req.user = user;
        next()
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
}



module.exports = {userAuth}