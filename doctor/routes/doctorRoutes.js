const express = require('express');
const { loginDoctor, registerDoctor } = require('../controllers/doctorController');
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");

// router obj
const router = express.Router();

// routes
router.post('/login', loginDoctor);
router.post('/register', registerDoctor);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const doc = await Doctor.findById(req.user.id).select("-password");
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctor profile" });
  }
});

module.exports = router;