const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  start_time: {
    type: String, // Can store time as "HH:mm"
    required: false,
  },
  end_time: {
    type: String, // "HH:mm"
    required: false,
  },
  shift_date: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["Active", "Available"],
    default: "Active",
  },
});

const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
