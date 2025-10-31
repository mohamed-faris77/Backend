const mongoose = require('mongoose')


const products = new mongoose.Schema({
  productname : String,
  description : String,
  price : Number
});

module.exports = mongoose.model("products",products)