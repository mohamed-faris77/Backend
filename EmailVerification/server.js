const express = require('express')
const mongoose = require('mongoose')
const routes = require("./route")
const dotenv = require("dotenv")


const app = express();
app.use(express.json())
dotenv.config()


app.use('/',routes)

mongoose.connect('mongodb+srv://5142mohamedfaris_db_user:D7GKRinL4KB5nnsg@cluster0.xrlrekm.mongodb.net/').then(
  ()=>{console.log("DB connected")}
).catch(()=>{console.log("error in connecting DB");
})


app.listen(5000, ()=>{
  console.log("server is running on port 5000")
})