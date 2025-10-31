import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const addProducts = () => {
    navigate('/addproducts')
  }

  return (
    <div style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#e0e0e0',
      padding: '20px',
      borderRight: '1px solid #ccc',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>Admin Panel</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#ccc', color: '#333', border: '1px solid #999', borderRadius: '4px', cursor: 'pointer' }}>
            View Users
          </button>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <button onClick={addProducts} style={{ width: '100%', padding: '10px', backgroundColor: '#ccc', color: '#333', border: '1px solid #999', borderRadius: '4px', cursor: 'pointer' }}>
            Add Products
          </button>
        </li>
        <li>
          <button onClick={handleLogout} style={{ width: '100%', padding: '10px', backgroundColor: '#ccc', color: '#333', border: '1px solid #999', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
