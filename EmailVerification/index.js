import express from 'express'


const app = express ();
app.use(express.json());


app.get('/', async(req , res)=>{
  const token = await req.body;
 
})



app.listen(5000, ()=>{
  console.log("Server is running");
  
})