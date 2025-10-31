import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectionRoute = ({children, allowedRole}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if(!token || role !== allowedRole){
    alert("Access denied! Login First");
    return <Navigate to = "/" replace/>
  }
  return (
    children
  )
}

export default ProtectionRoute
