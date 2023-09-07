const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // Sesuaikan dengan peran yang diperlukan.
    default: 'user', // Ganti nilai default sesuai kebutuhan.
  },
});

module.exports = mongoose.model('User', userSchema);