const express = require('express');
const router = express.Router()
const Student = require('./StudentModel');
// const { Model } = require('mongoose');

router.get("/addstudent", (req,res)=>{
  res.send("Student here")
})


router.post('/register', async (req,res) => {
try {
  const {name, age} = req.body;
  const student = new Student({name, age});
  await student.save();
  res.status(201).json({message : 'User registered successfully'});
} catch (error) {
  res.status(500).json({message : 'Server Error'})
  console.log(error);
  
}
})

router.get("/getstudent", async(req, res) =>{
  try {
    const student = await Student.find()
    res.json(student)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})

router.get("/getdata/:id", async (req, res)=>{
  try {
    const student = await Student.findById(req.params.id);
    res.json(student)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


router.delete("/delete/:id",async(req,res)=>{
try {
  const id = req.params.id;
  const student =  await Student.findByIdAndDelete(id)
  res.send('id deleted successfully')
} catch (error) {
  res.status(400).json({message : error.message})
}
})

router.patch('/update/:id', async(req,res)=>{
  try {
    const id =req.params.id;
    const updatedData = req.body;
    const options = {new : true}

    const result = await Student.findByIdAndUpdate(id, updatedData, options)

    res.send(result)

  } catch (error) {
    res.status(400).json({message : error.message})
  }
})


router.put("/put/:id", async(req,res)=>{
  try {
    const id = req.params.id;
    const updatefield = req.body;
    const options = {new : true}

    const result = await Student.findByIdAndUpdate(id, updatefield, options)

    res.send(result)
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})



module.exports = router;