const mongoose = require('mongoose');
const Counter = require('./counterModel'); // import the counter model

const adminSchema = new mongoose.Schema({
  adminId: {
    type: Number,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
});

// Pre-save hook: runs before saving an admin
adminSchema.pre('save', async function (next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'adminId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.adminId = counter.seq;
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
