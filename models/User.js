const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  role: { 
    type: String,
    enum:["customer","admin"],
    default: "customer",
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
