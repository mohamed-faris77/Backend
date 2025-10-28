const express = require("express")
const router = express.Router()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('./userModel')
const Token = require('./tokenModel')



router.post('/register', async(req , res)=>{
  try {
    const{username, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({ error : existingUser. isVerified ? "Email already exist" : " Email already exists, verification pending"})
    }

     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = new User({
      username,
      email,
      password : hashedPassword,
      isVerified : false
     })
     await newUser.save();

     const verificationToken = crypto.randomBytes(32).toString('hex');
     const newToken = new Token({
      userId : newUser._id,
      token : verificationToken,
      createdAt : Date.now()
     })
     await newToken.save();

     const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${newUser._id}/${verificationToken}`;

     const transporter = nodemailer.createTransport({
      service : "gmail",
      auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
      }
     })

     const mailOptions ={
      from : process.env.EMAIL_USER,
      to : newUser.email,
      subject : "Email Verification",
      text : `Please verify your email by clicking on the following link ${verificationUrl}`,
      html : `<p> Please verify the Email by clicking on the following link </p> <a href = "${verificationUrl}">${verificationUrl}</a>`
     }
     try {
      await transporter.sendMail(mailOptions);
      res.status(201).json({message : "user registration successful. Verification Email sent", newUser})
     } catch (error) {
      console.error("Error sending Email ", error.message)
      res.status(500).json({error : "Error sending verification Email"})
     }


  } catch (error) {
    console.error(error);
    res.status(500).json({ error : "Server error"})
  }
} )

router.get('/verify/:userId/:token', async (req, res)=>{
  try {
    const {userId, token} = req.params;
    console.log("Recievded verification");
    

    const tokenRecord = await Token.findOne({userId, token});
    if(!tokenRecord){
      console.error('Token not found or expired');
      return res.status(400).json({error : 'Invalid or expired token'})
    }
    console.log("Token found" , tokenRecord);

    const user = await User.findById(userId);
    if(!user){
      console.error('User not found');
      return res.status(404).json({error : "User not found "});
    }

    user.isVerified = true;
    await user.save();
    console.log(`user ${user.username} is now verified`, user.isVerified);

    await Token.deleteOne({_id : tokenRecord._id});
    console.log("Token deleted after successful verification");

    res.status(200).json({message : 'Email verified successfully'})
    

  } catch (error) {
    console.error('Error during Email veridfication' , error)
    res.status(500).json({error : 'server error'})
  }
})



module.exports = router;