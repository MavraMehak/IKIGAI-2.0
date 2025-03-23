// routes/shiftRoutes.js
const express = require("express");
const router = express.Router();

router.get("/shifts", (req, res) => {
  res.send("Shift route works!");
});

module.exports = router;
