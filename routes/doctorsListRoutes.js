const express = require("express");
const { getDoctors } = require("../controllers/docController");

const router = express.Router();

router.get("/", getDoctors); 

module.exports = router; 
