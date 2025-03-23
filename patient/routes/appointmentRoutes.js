const express = require("express");
const router = express.Router();
const Appointment = require("../patient/models/Appointment");

// Appointments for a specific patient
router.get("/patient/:patientId", async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const appointments = await Appointment.find({ patient_id: patientId });
    console.log(appointments);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
