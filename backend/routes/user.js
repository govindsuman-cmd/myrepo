const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

const {login, signup} = require("../controllers/AuthControllers");
const {auth, isRecruiter,isHiringManager,isAdmin} = require("../middleware/auth");

router.post("/login", login);
router.post("/signup", signup);


//Protected Route for hiring manager
router.get("/hiringmanager",auth, isHiringManager,
  (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Hiring Manager',
    });
} );
//Protected Route for recruiter
router.get("/recruiter", auth, isRecruiter, 
(req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Recruiter',
    });
});

module.exports = router;