const express = require('express');
const router = express.Router()
const Employee = require('./EmployeeModel')
 
router.get("/home",(req,res)=>{
  res.send("Hello")
})


router.post('/register', async (req,res) => {
try {
  const {name, age, number} = req.body;
  const emp = new Employee({name, age, number});
  await emp.save();
  res.status(201).json({message : 'Employee registered successfully'});
} catch (error) {
  res.status(500).json({message : 'Server Error'})
  console.log(error); 
}
})

router.get('/registeredemp', async (req,res)=>{
  try {
    const emp =await Employee.find();
    res.json(emp)
  } catch (error) {
    console.error(error)
  }
})



module.exports = router;