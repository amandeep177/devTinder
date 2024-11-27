const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

    firstName : {
        type:String,
        required:true,
        minLength:3
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,  // Mongoose will add a custom setter that removes leading and trailing whitespace using JavaScript's built-in String#trim().
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid email"+ value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("your password in not strong "+ value)
            }
        }
    },
    age:{
        type:Number,
        min:16,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){  // this validate function will only work on new insertion of data. if we want validata at updata we have to handle patch function
                throw new Error("gender data is invalid")
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("not valid URL"+ value)
            }
        }
    },
    about:{
        type:String,
        default: "this is default add something about you"
    },
    skills:{
        type:[String],
    },
},
{timestamps:true})

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Dev123456@", { expiresIn: '1h' });

    return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}
const Usermodel = mongoose.model("User", userSchema);

module.exports = Usermodel;