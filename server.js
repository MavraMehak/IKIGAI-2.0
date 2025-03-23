const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./patient/routes/appointmentRoutes'); 
const doctorLRoutes = require('./patient/routes/doctorsListRoutes'); 
const adminRoutes = require('./admin/routes/adminRoutes');
const doctorRoutes = require("./admin/routes/doctorRoutes");
const shiftRoutes = require("./admin/routes/shiftRoutes");
const docdoctorRoutes = require('./doctor/routes/doctorRoutes');
const docshiftRoutes = require('./doctor/routes/shiftRoutes');
const docappointmentRoutes = require('./doctor/routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/doctorsList", doctorLRoutes); 
app.use("/api/appointments", appointmentRoutes);
app.use("/api/bills", billRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/shifts", shiftRoutes);
app.use('/api/doctor', docdoctorRoutes);
app.use('/api/shifts', docshiftRoutes);
app.use('/api/appointments', docappointmentRoutes);

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
