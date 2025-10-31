import React, { useEffect, useState } from 'react'
import axios from "axios"
import SideBar from '../navigation/SideBar'

const AdminDashboard = () => {

  const [datas, setDatas] = useState([]);
  // const [showAddProduct, setShowAddProduct] = useState(false);
  // const [productForm, setProductForm] = useState({ productname: '', description: '', price: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users")
        setDatas(res.data)
      } catch (error) {
        console.log("Error fetching data" + error);

      }
    }

    fetchUsers()
  }, [])


  // const handleAddProduct = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/addproducts", productForm);
  //     console.log("Product added successfully:", response.data);
  //     alert("Product added successfully!");

  //     // Reset form and hide the form
  //     setShowAddProduct(false);
  //     setProductForm({ productname: '', description: '', price: '' });

  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     alert(" Failed to add product. Please try again.");
  //   }
  // };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <SideBar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%', backgroundColor: '#fff' }}>
        <h1 style={{ color: '#333' }}>Admin Dashboard</h1>
        <p style={{ color: '#666' }}>Only admin can access this page.</p>

        {/* <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setShowAddProduct(true)} style={{ padding: '10px 20px', backgroundColor: '#ddd', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Add Product
          </button>
        </div> */}



        {/* {showAddProduct && (
          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#333' }}>Add Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={productForm.productname}
              onChange={(e) => setProductForm({ ...productForm, productname: e.target.value })}
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <textarea
              placeholder="Description"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', height: '60px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={handleAddProduct} style={{ padding: '10px 20px', backgroundColor: '#ddd', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
              Add Product
            </button>
            <button onClick={() => setShowAddProduct(false)} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#ddd', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )} */}

        <h2 style={{ color: '#333' }}>Registered Users</h2>
        {/* <ul style={{ listStyle: 'none', padding: 0 }}>
          {datas.map((user) => (
            <li key={user._id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              Username: {user.username}, Role: {user.role}
            </li>
          ))}
        </ul> */}
        <table style={{
          width: '80%',
          margin: '20px auto',
          borderCollapse: 'collapse',
          textAlign: 'left',
          backgroundColor: '#f9f9f9'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#fff' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>#</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Username</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((user, index) => (
              <tr key={user._id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{index + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.username}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default AdminDashboard
