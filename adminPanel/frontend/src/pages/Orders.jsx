import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    status: 'pending',
    totalAmount: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const orderData = { ...formData, totalAmount };

    try {
      if (editingOrder) {
        await fetch(`http://localhost:5000/orders/${editingOrder._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
      } else {
        await fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
      }
      fetchOrders();
      setShowModal(false);
      setEditingOrder(null);
      setFormData({
        orderId: '',
        customer: '',
        items: [{ product: '', quantity: 1, price: 0 }],
        status: 'pending',
        totalAmount: 0
      });
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData(order);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' });
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content">
        <Navbar />
        <h2 style={{ textAlign: 'center' }}>Manage Orders</h2>
        <button onClick={() => setShowModal(true)} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Order
        </button>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Order ID</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Customer</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Total Amount</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.orderId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.customer}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.status}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>${order.totalAmount}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                    <button onClick={() => handleEdit(order)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(order._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '500px' }}>
              <h3>{editingOrder ? 'Edit Order' : 'Add Order'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Order ID"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  required
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="text"
                  placeholder="Customer"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  required
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <h4>Items</h4>
                {formData.items.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Product"
                      value={item.product}
                      onChange={(e) => updateItem(index, 'product', e.target.value)}
                      required
                      style={{ width: '30%', marginRight: '5px', padding: '8px' }}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      required
                      style={{ width: '30%', marginRight: '5px', padding: '8px' }}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                      required
                      style={{ width: '30%', padding: '8px' }}
                    />
                  </div>
                ))}
                <button type="button" onClick={addItem} style={{ marginBottom: '10px', padding: '5px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Item</button>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {editingOrder ? 'Update' : 'Add'} Order
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

export default Orders;
