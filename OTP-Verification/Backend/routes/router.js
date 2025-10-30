import express from 'express';
import Otp from '../Otp.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
const router = express.Router();


const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user : process.env.EMAIL,
    pass : process.env.PASSWORD
  }
}); 

router.post('/sendotp', async (req, res) => {
  const { email } = req.body;
    console.log("Email received ", email);
    
  const otp = generateOTP();
try {
  await Otp.deleteMany({email});

  const newOtp = new Otp({ email, otp });
  await newOtp.save();

 await transporter.sendMail({
    to : email,
    subject : "Your OTP Code",
    text : `Your OTP code is ${otp}.`
  });

  res.status(200).json({ message: 'OTP sent successfully' });
} catch (error) {
  res.status(500).json({ error : 'Failed to send OTP'})
  console.log(error);
}
})     


router.post('/verifyotp', async (req, res) => {
  const { email, otp } = req.body;   

  try {
    const record = await Otp.findOne({ email, otp })

    if(!record){
      return res.status(400).json({ error : 'Invalid OTP' });
    }

    await Otp.deleteMany({ email });
    res.status(200).json({ message : 'OTP verified successfully' });

  } catch (error) {
    res.status(500).json({ error : 'Failed to verify OTP' });
    console.log(error);
  }

})


export default router;