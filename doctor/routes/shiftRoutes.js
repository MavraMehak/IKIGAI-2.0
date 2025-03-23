const express = require('express');
const router = express.Router();
const shiftModel = require('../models/shiftModel');

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await shiftModel.find();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get shift by id
router.get('/:id', async (req, res) => {
  try {
    const shift = await shiftModel.findById(req.params.id);
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;