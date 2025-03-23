const express = require("express");
const { getDoctors } = require("../patient/controllers/docController");

const router = express.Router();

router.get("/", getDoctors); 

module.exports = router; 
