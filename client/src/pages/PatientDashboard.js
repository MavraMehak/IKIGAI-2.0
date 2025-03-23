import React, { useEffect, useState } from "react";
import { Table, Typography, message } from "antd";
import PatientLayout from "../components/PatientLayout";

const { Title } = Typography;

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch("/api/patient/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          const formatted = [
            {
              key: data._id,
              patientId: data.patientId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            },
          ];
          setPatientData(formatted);
        } else {
          message.error(data.message || "Failed to load patient data");
        }
      } catch (error) {
        console.error(error);
        message.error("Server error while fetching patient data");
      }
    };

    fetchPatient();
  }, []);

  const columns = [
    { title: "Patient ID", dataIndex: "patientId", key: "patientId" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <PatientLayout>
      <div>
        <Title level={3} className="patient-title">Patient Details</Title>

        <Table
          columns={columns}
          dataSource={patientData}
          bordered
          pagination={false}
          style={{ marginTop: "1rem" }}
        />
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
