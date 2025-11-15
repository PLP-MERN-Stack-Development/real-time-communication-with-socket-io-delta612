// In-memory storage controller for messages (simple starter)
// Replace with DB logic later if required

let messages = [];

exports.getMessagesHttp = (req, res) => {
  res.json(messages);
};

exports.addMessage = (messageObj) => {
  messages.push(messageObj);
  if (messages.length > 100) messages.shift();
};

exports.getAll = () => messages;