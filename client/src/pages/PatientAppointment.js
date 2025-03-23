import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointmentList from "../components/AppointmentList";
import PatientLayout from "../components/PatientLayout"; 
import { Typography } from "antd";

const { Title } = Typography;

const PatientAppointments = () => {
const [appointments, setAppointments] = useState([]);
const patient = JSON.parse(localStorage.getItem("patient")) || {}; 
const patientId = patient.patientId || 1; 

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/appointments/patient/${patientId}`)
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error(error));
    }, [patientId]);

    return (
        <PatientLayout>
        <div className="appointments-page">
            <Title level={3} className="appointments-title">My Appointments</Title>
            <div className="appointments-wrapper">
            <AppointmentList appointments={appointments} />
            </div>
        </div>
        </PatientLayout>
    );
};

export default PatientAppointments;
