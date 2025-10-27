import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {

  const [formData, setFormData] = useState({ username: "", password: ""});


  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e) =>{
  //   e.preventDefault()

  //   try {
  //     const data = await axios.post('http://localhost:5000/login', formData)



  //     alert("Login Successfull")
  //   } catch (error) {
  //     console.log("Error "  + error)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await axios.post("http://localhost:5000/login", formData);

    //   if (res.status === 202) {
    //     alert("Login Successful");
    //     navigate("/dashboard");
    //   }
    // } catch (error) {
    //   console.log("Error: ", error);
    //   alert("Login failed, please check your credentials");
    // }
    try {

      // const res = await axios.post("http://localhost:5000/login", formData)


      const res = await fetch("http://localhost:5000/login", {
       method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...formData}),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role === "admin") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          navigate("/dashboard");
        }
        else if (data.role === "user") {
          navigate("/userdashboard");
        }
        
        else {
          alert("Access Denied! Only Admin can login.");
        }
      }
      else{
        alert(data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("Login failed, please check your credentials");
    }
};
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Login Page</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '300px' }}>
            <input type="text" placeholder="username" name="username" onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="password" name="password" onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
          </form>
          <Link to="/register" style={{ marginTop: '20px', textAlign: 'center' }}>Go to Register</Link>
        </div>
      );
    }
    export default Login;