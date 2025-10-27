import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    alert("Access Denied! Please login as Admin.");
    return <Navigate to="/dashboard" replace />;
  }


  return (
   children
  )
}

export default ProtectedRoute
