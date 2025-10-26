const express = require('express');
const User = require('./UserRegister')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const app = express();
app.use(express.json())

mongoose.connect('mongodb+srv://5142mohamedfaris_db_user:D7GKRinL4KB5nnsg@cluster0.xrlrekm.mongodb.net/').then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log("Error in connecting DB" + err);
})



app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    const reg = new User({ username, password: hashedPassword })
    await reg.save();
    res.status(200).json({ message: "User Registered Successfully" })
  } catch (error) {
    console.log("Error in posting" + error);
  }
})


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // if (!user) return res.status(400).json({ message: " User not found" })

    if (user.username !== username) {
      return res.status(400).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Password doses not match" })

    // if(user.password !== password){
    //  return res.status(400).json({ message: "Password doses not match" }) 
    // }
    const token = jwt.sign({ id: user._id }, "!@#123", { expiresIn: "30m" })
    res.json({ token, user: { id: user._id, username: user.username } })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
})


app.get('/profile', async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: "No token, authorization deneid " });


  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "No Token, authorization deneid" })


  try {
    const decoded = jwt.verify(token, "!@#123");
    const user = await User.findById(decoded.id).select('-password');
    res.json(user)
  }
  catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
})

app.listen(5000, () => {
  console.log("Server is running");

})