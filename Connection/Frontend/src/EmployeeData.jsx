import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EmployeeData = () => {

  const [employee, setEmployee] = useState([])
  const[value, setValue] = useState()


  useEffect(()=>{
    axios.get('http://localhost:5000/registeredemp').then((res)=>{
      setEmployee(res.data);
    }).catch((err)=>{
      console.error('Error fetching employees :' + err);
      
    })
  },[])


  const changeData = () => {

  }

  


  const handleOnChange = (e) =>{
   setValue = e.target.value;
  }

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employee.map((emp, index)=>
        <li key={index}>{emp.name},{emp.age},{emp.number}  <button onClick={changeData}>Edit</button></li>
        )}
     
      </ul>

      <input type="text" value={value} onChange={handleOnChange}/>
        <li>{value}</li>
    </div>
  )
}

export default EmployeeData
