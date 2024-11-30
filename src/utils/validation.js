const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not valid");
    }
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = ["firstName", "lastName","photoUrl","gender","age","skills" , "about"];

    const isEditAlllowed =  Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAlllowed;
}

module.exports = { validateSignupData ,validateEditProfileData};