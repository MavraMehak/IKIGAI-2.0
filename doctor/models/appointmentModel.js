import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
      appointment_id: Number,
      patient_id: Number,
      doctor_id: Number,
      appointment_date: Date,
      start_time: String,
      end_time: String,
      status: String,
      price: Number,
    },
    { collection: "Appointment" } 
  );

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;