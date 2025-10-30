import express from 'express';
import mongoose from 'mongoose'
import dotenv from "dotenv"
import router from './routes/router.js';
import cors from 'cors';  


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("Database connected");
}).catch((err)=>{
  console.error("Database connection error", err);
})

app.use('/', router);


app.listen(5000 , ()=>{
  console.log("Server is running");
  
})