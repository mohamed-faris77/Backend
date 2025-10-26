import React, { useState } from 'react'
import axios from 'axios'


const Register = () => {


  const [formData, setFormData] = useState({
    name: '',
    age: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:5000/register', formData)
      alert("registered")
    } catch (error) {
      alert("Failed")
      console.log("Error" + error);

    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type="text" name='name' onChange={handleChange} />
        <br />
        <label>Age :</label>
        <input type='text' name='age' onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
