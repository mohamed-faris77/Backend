import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/orders", icon: "📦", label: "Orders" },
    { path: "/products", icon: "🛍️", label: "Products" },
    { path: "/users", icon: "👥", label: "Users" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
