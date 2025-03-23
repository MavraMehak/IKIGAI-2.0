const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerDoctor = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const existingDoc = await Doctor.findOne({ email });
        if (existingDoc) {
            return res.status(400).send({ message: 'User already exists', success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // Create new user
        const newUser = new Doctor(req.body);

        // Save user to database
        await newUser.save();

        res.status(201).send({ message: 'Doctor registered successfully', success: true });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send({ message: 'Server error', error, success: false });
    }
};

const loginDoctor = async (req, res) => {
    try {
        const { email, password, role } = req.body; // Role provided in the form

        // Check if user exists
        const existingDoc = await Doctor.findOne({ email });

        if (!existingDoc) {
            return res.status(400).send({ message: 'Doctor does not exist', success: false });
        }

        // Check if the role matches the stored role in the database
        if (existingDoc.role !== role) {
            return res.status(403).send({ message: `Access denied. You are registered as ${existingDoc.role}.`, success: false });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, existingDoc.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials', success: false });
        }
        
        const token = jwt.sign({ id: existingDoc._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Send success response
        return res.status(200).send({
            message: 'Login successful',
            success: true,
            token,
            user: {
                doctor_id: existingDoc._id,
                first_name: existingDoc.first_name,
                last_name: existingDoc.last_name,
                email: existingDoc.email,
                phone: existingDoc.phone,
                role: existingDoc.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error', error });
    }
};

module.exports = {
    loginDoctor,
    registerDoctor
};
