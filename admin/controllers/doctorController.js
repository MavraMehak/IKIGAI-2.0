const Doctor = require("../models/Doctor");
const DoctorRequest = require("../models/DoctorRequest");

// Get all pending requests
const getDoctorRequests = async (req, res) => {
  try {
    const requests = await DoctorRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor requests" });
  }
};

// Approve request by ID
const approveDoctorRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await DoctorRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Get max doctor_id for auto-increment
    const lastDoctor = await Doctor.findOne().sort({ doctor_id: -1 });
    const nextDoctorId = lastDoctor ? lastDoctor.doctor_id + 1 : 1;

    // Create new doctor
    const newDoctor = new Doctor({
      doctor_id: nextDoctorId,
      first_name: request.doc_Fname,
      last_name: request.doc_Lname,
      email: request.email,
      password: request.password,
      specialized: request.specialized,
      gender: request.gender,
      mobile_number: request.mobile_number,
      image: null,
    });

    await newDoctor.save();
    await request.deleteOne(); // Remove request after approval

    res.status(201).json({ message: "Doctor approved and added to system" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving doctor" });
  }
};

const rejectDoctorRequest = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const request = await DoctorRequest.findByIdAndDelete(requestId);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      res.status(200).json({ message: "Doctor request rejected" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error rejecting request" });
    }
  };


  //Manage doctor

  const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const updateDoctor = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      res.status(200).json({ message: "Doctor updated", doctor: updatedDoctor });
    } catch (err) {
      console.error("Error updating doctor:", err);
      res.status(500).json({ message: "Server error during update" });
    }
  };

  const deleteDoctor = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Doctor.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      res.status(200).json({ message: "Doctor deleted" });
    } catch (err) {
      console.error("Error deleting doctor:", err);
      res.status(500).json({ message: "Server error during deletion" });
    }
  };
  
  
  module.exports = {
    getDoctorRequests,
    approveDoctorRequest,
    rejectDoctorRequest,
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
  };
  
