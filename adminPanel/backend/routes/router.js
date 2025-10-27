const express = require('express');
const router = express.Router();
const Order = require('../Schema/orderSchema');
const Product = require('../Schema/productSchema');
const Datas = require('../Schema/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/orders', async (req, res) => {
  const order = new Order({
    orderId: req.body.orderId,
    customer: req.body.customer,
    items: req.body.items,
    status: req.body.status,
    totalAmount: req.body.totalAmount
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an order
router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
router.delete('/orders/:id', async (req, res) => {
  try {
   await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedpassword = await bcrypt.hash(password, 5)

  try {
    const datas = new Datas({ username, password: hashedpassword, role });
    await datas.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.log("Error " + error)
    res.status(404).json({ message: "Error in posting" })
  }

})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const datas = await Datas.findOne({ username })

    if (datas.username !== username) {
      return res.status(400).json({ message: "Username Doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, datas.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Entered password is wrong" })

    }

    const token = jwt.sign({id: datas._id, role: datas.role}, "supersecretkey", {expiresIn : '30m'})

    // res.status(202).json({ message: "Login Successfull" })
    res.json({token, role: datas.role})

  } catch (error) {
    console.log("Error " + error)
    res.status(404).json({ message: "Error in Logging In" })
  }
})

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await Datas.find({}, { password: 0 }); // Exclude password field
    res.json(users);
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

//delete user
router.delete('/users/:id', async (req, res) => {
  try {
   await Datas.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Product routes
// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    image: req.body.image
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
