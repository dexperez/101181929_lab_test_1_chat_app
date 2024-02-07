// Initialize socket.io connection
const socket = io();

// Event listener for successful connection
socket.on('connect', () => {
  console.log('Socket connected');
});

// Event listener for connection errors
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

// Prompt the user for their username
const username = prompt('Enter your username:');

// Emit a 'join' event with the username to notify the server
socket.emit('join', username);

// Get references to DOM elements
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

// Event listener for incoming messages
socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatWindow.appendChild(messageElement);
});

// Event listener for sending messages
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.emit('chat', message);
  messageInput.value = ''; // Clear the message input field after sending
});
