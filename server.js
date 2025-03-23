const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes'); 
const doctorRoutes = require('./routes/doctorsListRoutes'); // ✅ Correct import

dotenv.config();
connectDB();

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/doctors", doctorRoutes); 
app.use("/api/appointments", appointmentRoutes);
app.use("/api/bills", billRoutes);

app.get('/', (req, res) => {
    res.status(200).send({
      message: 'server running'
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white
  );
});
