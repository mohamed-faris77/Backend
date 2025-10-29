import express from 'express';
import mongoose from 'mongoose'

const app = express();
app.use(express.json())

mongoose.connect('mongodb+srv://5142mohamedfaris_db_user:D7GKRinL4KB5nnsg@cluster0.xrlrekm.mongodb.net/').then(()=>{
  console.log("Db connected")
}).catch(()=>{
  console.log("Error connecting DB")
})


app.get('/', async (req, res)=>{
try {  res.send("Get")
} catch (error) {
  console.log(error + "Error");
}
}
)



app.listen(5000, ()=>{
  console.log("Server is running");
} )