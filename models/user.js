const mongoose = require('mongoose');

// Define MongoDB schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

// Define MongoDB model
const User = mongoose.model('User', userSchema);

module.exports = User;
