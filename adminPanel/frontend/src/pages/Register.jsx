import { Link } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {

  const [formData, setFormData] = useState(
    { username: '', password: '', role: '' }
  );

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const connect = await axios.post('http://localhost:5000/register', formData)
      alert("Registered successfully")
      navigate("/")
    } catch (error) {

      console.log("Error in registering", error)
    }

    // console.log("Submitted:", { username, password });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Register Page</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '300px' }}>
        <input type="text" placeholder="username" name="username" onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="role" name="role" onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
      <Link to="/" style={{ marginTop: '20px', textAlign: 'center' }}>Back to Login</Link>
    </div>
  );
}

export default Register;
