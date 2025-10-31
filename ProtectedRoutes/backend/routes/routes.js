const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const User = require('../schema/LogReg')
const Product = require('../schema/ProductReg')
const dotenv = require('dotenv')
dotenv.config()

const secretkey = process.env.Secret_Key;
const expires = process.env.Expires;

router.post("/register", async (req, res)=>{
  try {
    const {username, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password : hashedPassword, role});
    await newUser.save();
    res.json({message : "User registered successfully"})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

router.post('/login', async(req, res)=>{
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(!user) return res.status(404).json({message:"user not found"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message : " Invalid login Credentials"})

    const token = jwt.sign({id : user._id, role : user.role}, secretkey, { expiresIn : expires})
    res.json({token, role : user.role})

  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

router.post("/addproducts", async (req, res)=>{
  try {
    const {productname, description, price} = req.body;
    const newProduct = new Product({productname, description, price});
    await newProduct.save();
    res.json({message : "Product updated Successfully"})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

router.get("/getproducts", async(req,res)=>{
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})


router.get('/users', async (req, res) => {
  try {
   const users =await User.find({role:"user"});
    res.json(users)
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})


module.exports = router;