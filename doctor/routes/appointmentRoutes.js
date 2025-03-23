const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get appointment by id
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;