import React, { useState, useEffect } from "react";
import axios from "axios";

function Pagination() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users with pagination
  useEffect(() => {
    axios.get(`http://localhost:5000/users?page=${page}&limit=4`)
      .then(res => {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      });
  }, [page]);

  // Add new user
  const addUser = async () => {
    await axios.post("http://localhost:5000/users", form);
    setForm({ name: "", email: "" });
    setPage(1); // refresh to first page
  };

  // Update user
  const updateUser = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await axios.put(`http://localhost:5000/users/${id}`, { name: newName });
      setPage(1);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setPage(1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD + Pagination</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => updateUser(u._id)}>Edit</button>
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination
