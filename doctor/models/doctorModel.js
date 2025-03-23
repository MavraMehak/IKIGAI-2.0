const mongoose = require('mongoose');
const Counter = require('./counterModel');

const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: Number,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    specialized: String,
    gender: String,
    phone: {
        type: String,
        match: /^[0-9]{11}$/,
        required: true
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
    role: {
        type: String,
        default: 'doctor'
    },
    image: {
        type: String,
        default: null
    }
});

// Pre-save hook: runs before saving an doctor
doctorSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { id: 'doctor_id' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        doc.adminId = counter.seq;
    }
    next();
});
  

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
