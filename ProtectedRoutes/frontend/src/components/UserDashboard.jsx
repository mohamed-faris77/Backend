import React, { useEffect, useState } from 'react';
import axios from "axios";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#333' }}>User Dashboard</h2>
      <h3 style={{ color: '#333' }}>Available Products</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product._id}
              style={{
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <h4 style={{ color: '#333' }}>{product.productname}</h4>
              <p style={{ color: '#666' }}>{product.description}</p>
              <p style={{ color: '#333' }}>Price: ₹{product.price}</p>
            </li>
          ))
        ) : (
          <p style={{ color: '#666' }}>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
