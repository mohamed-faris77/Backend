const mongoose = require('mongoose')


const user = new mongoose.Schema({
  username : String,
  password : String,
  role :{
    type : String,
    enum:["admin" , "user"],
    default : "user"
  }
});

module.exports = mongoose.model("user",user)