const mongoose = require("mongoose");

const doctorRequestSchema = new mongoose.Schema({
  doc_Fname: { type: String, required: true },
  doc_Lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialized: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  mobile_number: { type: String },
});

module.exports = mongoose.model("DoctorRequest", doctorRequestSchema);
