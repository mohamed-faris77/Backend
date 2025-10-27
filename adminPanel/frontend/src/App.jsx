import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
// import Orders from "./pages/Orders";
import Users from "./pages/Users";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/products" element={<Products />} />
      {/* <Route path="/orders" element={<Orders />} /> */}
      <Route path="/users" element={<Users />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;

