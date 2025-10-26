const express= require('express')
const mongoose = require('mongoose')
const routes = require("./routes")
const cors = require('cors')
const student= require('./studentroute')
const app = express();


app.use(cors())
app.use(express.json())



mongoose.connect('mongodb+srv://5142mohamedfaris_db_user:D7GKRinL4KB5nnsg@cluster0.xrlrekm.mongodb.net/').then(
  ()=>{console.log("Connected");
  }
).catch((error)=>{console.log("Error"+ error );
})

app.use('/', routes)
app.use('/api', student) 





// app.use((req, res, next)=>{
//   console.log(`${req.method} ${req.url}`);
//   next()
// })

// app.get('/home', (req, res)=>{
//   res.send("Welcome")
// })




app.listen(5000, ()=>{
  console.log("Server is running");
})