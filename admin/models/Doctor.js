const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctor_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialized: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  mobile_number: { type: String },
  image: { type: String, default: null },
});

module.exports = mongoose.model("Doctor", doctorSchema);
