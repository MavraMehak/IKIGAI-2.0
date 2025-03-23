const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  total_price: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
