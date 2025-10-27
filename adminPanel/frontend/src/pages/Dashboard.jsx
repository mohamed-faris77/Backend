import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        fetch('http://localhost:5000/orders'),
        fetch('http://localhost:5000/products'),
        fetch('http://localhost:5000/users')
      ]);

      const orders = await ordersRes.json();
      const products = await productsRes.json();
      const users = await usersRes.json();

      // Get recent 5 orders
      const recentOrders = orders.slice(-5).reverse();

      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: users.length,
        recentOrders
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h2>Admin Panel Dashboard</h2>
            <p>Welcome back! Here's what's happening with your store today.</p>
          </div>

          <div className="dashboard-widgets">
            <div className="widget">
              <div className="widget-icon">📦</div>
              <div className="widget-content">
                <h4>Total Orders</h4>
                <p className="widget-number">{stats.totalOrders}</p>
              </div>
            </div>
            <div className="widget">
              <div className="widget-icon">🛍️</div>
              <div className="widget-content">
                <h4>Total Products</h4>
                <p className="widget-number">{stats.totalProducts}</p>
              </div>
            </div>
            <div className="widget">
              <div className="widget-icon">👥</div>
              <div className="widget-content">
                <h4>Active Users</h4>
                <p className="widget-number">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Recent Orders</h3>
            <div className="recent-orders">
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-info">
                      <span className="order-id">#{order.orderId}</span>
                      <span className="order-customer">{order.customer}</span>
                    </div>
                    <div className="order-status">
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <span className="order-amount">${order.totalAmount}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
