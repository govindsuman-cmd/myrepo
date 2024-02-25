const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
 email:{
        type:String,
        require:true,
},
 otp:{
        type:String,
        require:true
},
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
 }
});

//a funciton ->to send emails
async function sendVerificationEmail(email,otp){
        try {
          const mailResponse=await mailSender(email,'verification email from ReferNow',otp)
          console.log(`email sent successfully ${mailResponse}`)  
        } catch (error) {
                console.log(`error occured while sending mails ${email}`)
                throw(error)
        }
}
OTPSchema.pre('save',async function(next){
        await sendVerificationEmail(this.email,this.otp);
        next();
})

module.exports = mongoose.model('OTP', OTPSchema);
