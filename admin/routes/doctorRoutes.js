const express = require("express");
const {
    getDoctorRequests,
    approveDoctorRequest,
    rejectDoctorRequest,
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
  } = require("../controllers/doctorController");
  
const router = express.Router();

router.get("/requests", getDoctorRequests);
router.post("/approve/:requestId", approveDoctorRequest);
router.delete("/reject/:requestId", rejectDoctorRequest);
router.get("/all", getAllDoctors); // GET all doctors
router.put("/update/:id", updateDoctor); // UPDATE doctor
router.delete("/remove/:id", deleteDoctor); // DELETE doctor

module.exports = router;
