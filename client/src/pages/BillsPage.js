import React, { useEffect, useState } from "react";
import { Table, Typography, message } from "antd";
import PatientLayout from "../components/PatientLayout";
import { fetchBills } from "../services/billService";

const { Title } = Typography;

const BillsPage = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const loadBills = async () => {
        try {
            const data = await fetchBills();
            if (data.length > 0) {
            const formatted = data.map((bill) => ({
                key: bill._id,
                patientName: bill.patient_id?.name || "Unknown",
                totalPrice: `$${bill.total_price.toFixed(2)}`,
                date: new Date(bill.createdAt).toLocaleDateString(),
            }));
            setBills(formatted);
            } else {
            message.info("No bills found.");
            }
        } catch (error) {
            message.error("Error fetching bills.");
        }
        };

        loadBills();
    }, []);

    const columns = [
        { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
        { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
        { title: "Date", dataIndex: "date", key: "date" },
    ];

    return (
        <PatientLayout>
        <div>
            <Title level={3} className="patient-title">Billing Information</Title>

            <Table
            columns={columns}
            dataSource={bills}
            bordered
            pagination={false}
            style={{ marginTop: "1rem" }}
            />
        </div>
        </PatientLayout>
    );
};

export default BillsPage;
