require("dotenv").config()
const JWT=require('jsonwebtoken')

exports.auth=async(req,res,next)=>{
    try {
       //extract JWT 
       const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "") ;
       if(!token){
        return res.this.status(401).json({
            success:false,
            message:"Token Unavaliable"
        })
       }
       //token verification
       try {
           const payload= JWT.verify(token,process.env.JWT_SECRET);
           console.log(payload);
           req.user=payload;
       } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"verification failed",
        })
       }
       next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong in token verification'
        })
    }
}
exports.isHiringManager=(req,res,next)=>{
    try {
        if(req.user.role !== "Hiring-Manager") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Hiring-Managers',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isRecruiter = (req,res,next) => {
    try{
        if(req.user.role !== "Recruiter") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Recruiter',
            });
        }
        next();
}
catch(error) {
    return res.status(500).json({
        success:false,
        message:'User Role is not matching',
    })
}
}