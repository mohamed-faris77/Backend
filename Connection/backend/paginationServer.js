const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect MongoDB
mongoose.connect('mongodb+srv://5142mohamedfaris_db_user:D7GKRinL4KB5nnsg@cluster0.xrlrekm.mongodb.net/').then(()=>{
  console.log("DB connected");
}).catch(()=>{console.log("Error in connecting DB");
})

// 2. Create Schema + Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const Page = mongoose.model("Page", UserSchema);

// 3. CRUD Endpoints

// Create
app.post("/users", async (req, res) => {
  const user = new Page(req.body);
  await user.save();
  res.json(user);
});

// Read with Pagination
app.get("/users", async (req, res) => {
  let { page , limit } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const users = await Page.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Page.countDocuments();
  res.json({
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
});

// Update
app.put("/users/:id", async (req, res) => {
  const user = await Page.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// Delete
app.delete("/users/:id", async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
