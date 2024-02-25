const bcrypt=require('bcrypt')
const userModel=require('../models/userModel')
const JWT=require("jsonwebtoken");
// const OTP=require('../models/OTP')
require('dotenv').config()
// const otpGenerator=require("otp-generator")
//send OTP
/*exports.sendOTP=async(req,res)=>{
  try {
        //fetch email
        const {email}=req.body;

        //check if user exist
        const checkUserPresent=await userModel.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User already exist'
            })
        }
        //generate otp
        var otp= otpGenerator.generate(6,{
           upperCaseAlphabets:false,
           lowerCaseAlphabets:false,
           specialChars:false
        });
        console.log(`generated otp ${otp}`);
    
        //check unique otp or not
        const result=await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result=await OTP.findOne({otp:otp});
        }
        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);
    
        res.status(200).json({
            success:true,
            message:'otp generated successfully',
            otp
        })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:`otp generation failed -> ${error.message}`
    })
  }
}*/
//signup handler
exports.signup=async(req,res)=>{
    try {//enter data from the user
        const {name,email,password,confirmPassword,role
            //, otp
        }=req.body;
        //validator
        if(!name||!email||!password||!confirmPassword||!role
            // ||!otp
            ){
           return res.status(401).json({
            success:false,
            message:`all fields are required`
           })
        }
        //check if user already exist
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
              success:false,
              message:"user already exist"
            })
        }
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password is not matching'
            })
        }
        //find the most recent otp stored for the user
      /*  const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length==0){
          return res.status(400).json({
            success:false,
            message:"OTP Found"
          })
        }else if(otp!==recentOtp.otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }*/
        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Hashing password failed'
            })
        }
        const user=await userModel.create({
           name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:`${role} account created successfully`
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User registartion failed please try again"
        })
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({
                success:false,
                message:"Please Fill all details"
            })
        }
        let user=await userModel.findOne({email})
        //if user is not registered
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User don't exist"
            })
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        }
        //password verification
        if(await bcrypt.compare(password,user.password)){
          //if password matched
          let token=JWT.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"5h",
          });
          user=user.toObject();
          user.token=token;
          user.password=undefined;
          const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
          }
          res.cookie("referCookie",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged in successfully"
          });

        }else{//if password didn't matched
            return res.status(403).json({
                success:false,
                message:"Incorrect Password"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Logged In failed please try again"
        })     
    }
  }
//   exports.changePassword=async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
//   }