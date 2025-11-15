const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'mongodb+srv://Delta:Delta@cluster0.lmydysu.mongodb.net/?appName=Cluster0' // Default Vite port,