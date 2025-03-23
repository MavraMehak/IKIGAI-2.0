const Doctor = require("../models/Doctor.js");

const getDoctors = async (req, res) => {
  try {
    const filters = {};

    if (req.query.specialization) {
      filters.specialized = new RegExp(req.query.specialization, "i"); 
    }
    if (req.query.gender) {
      filters.gender = req.query.gender; 
    }

    const doctors = await Doctor.find(filters);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDoctors };
