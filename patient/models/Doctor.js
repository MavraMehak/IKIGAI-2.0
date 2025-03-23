const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  specialized: String,
  gender: String,
  mobile_number: String,
  image: String
});

const Doctor =   mongoose.model("Doctor", doctorSchema, "doctors");
module.exports = Doctor;