import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import ProtectionRoute from './components/ProtectionRoute'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AddProducts from './components/AddProducts'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addproducts" element={<AddProducts />} />

        <Route path='/admin' element={<ProtectionRoute allowedRole='admin'><AdminDashboard /></ProtectionRoute>} />
        <Route path='/user' element={<ProtectionRoute allowedRole='user'><UserDashboard /></ProtectionRoute>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
