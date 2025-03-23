const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({
    message: "Login successful",
    token,
    admin: {
      adminId: admin.adminId,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phone,
    },
  });
};

const registerAdmin = async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
  
      // Check if email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already registered" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 4);
  
      // Create new admin
      const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  };
  

  
  
  module.exports = {
    registerAdmin,
    loginAdmin
  };
  


