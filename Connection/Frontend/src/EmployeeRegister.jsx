import React, { useState } from 'react'
import axios from 'axios'

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    number: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:5000/register', formData)
      alert("Registered")
    } catch (error) {
      alert("failed");
      console.log("Error" + error);

    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' name='name' onChange={handleChange} />
        <input type="text" placeholder='age' name='age' onChange={handleChange} />
        <input type="text" placeholder='number' name='number' onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EmployeeRegister
