const express = require('express');
const User = require('../models/user');
const path = require('path');

const router = express.Router();

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, '../public')));

// Signup route
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    console.log('User signed up:', user);
    res.redirect('/login');
  } catch (error) {
    console.error('Error signing up:', error);
    res.redirect('/signup');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    console.log('User logged in:', user);
    res.redirect('/chat');
  } else {
    console.log('Login failed: Invalid username or password');
    res.redirect('/login');
  }
});

// Chat route
router.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'chat.html'));
});

module.exports = router;