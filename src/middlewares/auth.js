
const adminAuth = (req,res,next)=>{
    console.log("authorising");
    
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised request")
    }else{
        next();
    }
}
const userAuth = (req,res,next)=>{
    console.log("authorising");
    
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised request")
    }else{
        next();
    }
}



module.exports = {adminAuth,userAuth}