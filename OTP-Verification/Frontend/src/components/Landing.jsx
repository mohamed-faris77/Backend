import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const Landing = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: ''
  })

  const requestOtp = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post('http://localhost:5000/sendotp', { email: formData.email })
      toast.success("OTP sent to your email")
      setTimeout(() => {
        navigate('/verify', { state: { email: formData.email } })  //navigating to verify page with email as state;

      }, 1000)


    } catch (error) {
      console.log("Error" + error);
      toast.error("failed");
    }


  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <form onSubmit={requestOtp}>
        <label>Email:</label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} required />
        <br></br>
        <button type='submit'>Request OTP</button>
      </form>


    </div>
  )
}

export default Landing
