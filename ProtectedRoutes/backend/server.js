const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose') 
const cors = require('cors')
dotenv.config()
const router = require('./routes/routes')


const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000;
const db = process.env.DB_URL; 


mongoose.connect(db).then(()=>{
console.log("DB connected Successfully");
}).catch((err)=>{
console.log("erroe in connecting DB" + err)
})

app.use("/", router)

app.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
  
})