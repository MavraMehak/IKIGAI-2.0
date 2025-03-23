const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const authMiddleware = require("../middlewares/authMiddleware");
const Admin = require("../models/adminModel");

const router = express.Router();


router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: "Error fetching admin profile" });
  }
});

// login route
router.post('/login', loginAdmin); 
router.post('/register', registerAdmin); 

module.exports = router;
