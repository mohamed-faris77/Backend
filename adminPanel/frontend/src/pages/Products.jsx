import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await fetch(`http://localhost:5000/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        image: ''
      });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content">
        <Navbar />
        <h2 style={{ textAlign: 'center' }}>Manage Products</h2>
        <button onClick={() => setShowModal(true)} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Product
        </button>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Stock</th>

                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Actions</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.category}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>${product.price}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.stock}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    <button onClick={() => handleEdit(product)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(product._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '500px' }}>
              <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  style={{ width: '100%', marginBottom: '10px', padding: '8px', height: '80px' }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                  style={{ width: '48%', marginBottom: '10px', padding: '8px', marginRight: '4%' }}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                  style={{ width: '48%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {editingProduct ? 'Update' : 'Add'} Product
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

export default Products;
