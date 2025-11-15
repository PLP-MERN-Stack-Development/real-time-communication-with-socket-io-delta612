// setup socket handlers and export a function that accepts `io`
// This is compatible with the server.js you provided earlier.

const { addMessage } = require('../controllers/chatController');
const Message = require('../models/messageModel');

function setupSocket(io) {
  const users = {};      // socketId -> { username, id }
  const typingUsers = {}; // socketId -> username

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // user_join: {username}
    socket.on('user_join', (username) => {
      users[socket.id] = { username, id: socket.id };
      io.emit('user_list', Object.values(users));
      io.emit('user_joined', { username, id: socket.id });
      console.log(`${username} joined (${socket.id})`);
    });

    // send_message: { message }
    socket.on('send_message', (data) => {
      const msg = new Message({
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message: data.message,
        timestamp: new Date().toISOString(),
        isPrivate: false,
      });

      addMessage(msg);
      io.emit('receive_message', msg);
    });

    // typing: boolean
    socket.on('typing', (isTyping) => {
      if (isTyping) typingUsers[socket.id] = users[socket.id]?.username;
      else delete typingUsers[socket.id];
      io.emit('typing_users', Object.values(typingUsers));
    });

    // private_message: { to: socketId, message: 'text' }
    socket.on('private_message', ({ to, message }) => {
      const msg = new Message({
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message,
        timestamp: new Date().toISOString(),
        isPrivate: true,
      });

      addMessage(msg); // optional storage
      if (to) {
        socket.to(to).emit('private_message', msg);
        socket.emit('private_message', msg);
      }
    });

    socket.on('disconnect', () => {
      const user = users[socket.id];
      if (user) {
        io.emit('user_left', user);
        console.log(`${user.username} disconnected (${socket.id})`);
      } else {
        console.log(`Socket disconnected: ${socket.id}`);
      }
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    });
  });
}

module.exports = setupSocket;