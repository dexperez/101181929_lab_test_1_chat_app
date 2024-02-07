const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Import user model
const User = require('./models/user');

// Import routes
const authRouter = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const serverIo = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vandexterperez:admin@cluster0.kfkpicy.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve static files from the public directory
app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use(authRouter);


// WebSocket connection handling
serverIo.on('connection', (socket) => {
  console.log('Socket connection made', socket.id);

  // Handle chat messages
  socket.on('chat', (message) => {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients
    serverIo.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
