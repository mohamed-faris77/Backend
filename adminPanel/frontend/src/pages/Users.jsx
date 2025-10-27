import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // For editing, we need to handle password update separately
        if (formData.password) {
          // Update password via register endpoint (this is a workaround)
          await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        }
        // Note: Username updates are not supported in this implementation
      } else {
        await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      fetchUsers();
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        username: '',
        password: ''
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '' // Don't show existing password
    });
    setShowModal(true);
  };

  // const handleDelete = async (username) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     try {
  //       // Note: This is a simplified delete - in a real app you'd need a proper delete endpoint
  //       // For now, we'll just remove from local state
  //       setUsers(users.filter(user => user.username !== username));
  //     } catch (error) {
  //       console.error('Error deleting user:', error);
  //     }
  //   }
  // };



  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content">
        <Navbar />
        <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
        <button onClick={() => setShowModal(true)} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add User
        </button>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Username</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.username}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    <button onClick={() => handleEdit(user)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(user._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
              <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  disabled={!!editingUser} // Disable username editing
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="password"
                  placeholder={editingUser ? "New Password (leave empty to keep current)" : "Password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {editingUser ? 'Update' : 'Add'} User
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
