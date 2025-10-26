import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StudentData = () => {
const [users, setUsers] = useState([]);

useEffect(()=>{
  axios.get('http://localhost:5000/getstudent').then((res)=>{
    setUsers(res.data);
  }).catch((err)=>{
    console.error('Error Fetching users : ', err);
  })
},[])

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index)=>
        <li key={index}> {user.name} -{user.age}</li>
        )}
      </ul>
    </div>
  )
}

export default StudentData
