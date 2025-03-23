const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },  // e.g., 'adminId'
  seq: { type: Number, default: 0 }      // the current value
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
