const Bill = require("../models/billModel");

// Get all bills
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("patient_id", "name");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new bill
const createBill = async (req, res) => {
  const { patient_id, total_price } = req.body;
  try {
    const bill = new Bill({ patient_id, total_price });
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Failed to create bill", error });
  }
};

module.exports = { getBills, createBill };
