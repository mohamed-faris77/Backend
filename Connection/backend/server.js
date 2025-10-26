const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')
const path = require('path')

const app = express();
app.use(express.json())


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'newapp',
  password: '5000',
  port: 5432,
})

pool.connect().then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log("Error " + err);
})

app.post("/add", async (req, res) => {
  const { name, password } = req.body;

  try {
    const result = await pool.query('INSERT INTO login (name, password) VALUES ($1, $2) RETURNING *',
      [name, password]);

    res.json(result.rows[0]);
  }
  catch (error) {
    console.log("Error " + error);
    res.status(500).send("server error")
  }
  
})

app.get('/add', async(req, res)=>{
  try {
    const result = await pool.query('SELECT * FROM login ORDER BY id desc');
    res.json(result.rows)
  } catch (error) {
    console.log("Error"  + error);
    res.status(500).send("server error")
  }
});

app.post("/user", async (req, res) => {
  const { name, number } = req.body;

  try {
    const result = await pool.query('INSERT INTO users (name, number) VALUES ($1, $2) RETURNING *',
      [name, number]);
    res.json(result.rows[0])
  } catch (error) {
    console.log("error " + error);
    res.status(500).send("Server Error")
  }

})

app.get("/user", async (req, res) =>{
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id desc');
    res.json(result.rows)
  } catch (error) {
    console.log("Error" + error);
    res.status(500).send("server Error")
  }
})

app.post("/course", async (req, res) => {
  const { name, course, number } = req.body;

  try {
    const result = await pool.query('INSERT INTO class(name, course, number) VALUES ($1, $2, $3) RETURNING *',
      [name, course, number]);
    res.json(result.rows[0])
  } catch (error) {
    console.log("Error " + error);
    res.status(500).send("Server Error")
  }
})

app.get("/course", async(req,res)=>{
  try {
    const result = await  pool.query ('SELECT * FROM class ORDER BY id desc')
    res.json(result.rows)
  } catch (error) {
    console.log("Error" + error);
    res.status(500).send("server error")
  }
})

app.get("/course/:id", async(req,res)=>{
  const id = req.params.id;
  try {
    const result = await  pool.query ('SELECT * FROM class WHERE id = $1 ORDER BY id desc',[id])
    res.json(result.rows)
  } catch (error) {
    console.log("Error" + error);
    res.status(500).send("server error")
  }
})

app.delete("/course/:id", async(req, res)=>{
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM class WHERE id = $1 RETURNING *',[id]);

    if(result.rows.length ===0){
      return res.status(404).json({message : "Course not found"});
    }

    res.json({message :"Course deleted successfully", deleted : result.rows[0]
    })

  } catch (error) {
    console.error("Error " + error);
    res.status(400).send("Server Error");
    
  }
})


app.get("/",async(req,res) =>{

  res.sendFile(path.join(__dirname,"index.html"))
})




app.listen(5000, () => {
  console.log('server is running')
})