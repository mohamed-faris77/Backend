const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const router = require('./routes/router');
const cors = require('cors')
dotenv.config();

const app= express();
app.use(express.json())
app.use(cors())

const dbstring = process.env.DB_URL;

mongoose.connect(dbstring).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
 console.log(err + " error in connecting DB");
 
})


app.use("/", router);

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});