import React, { useEffect, useState } from "react";
import { Table, Typography, message } from "antd";
import AdminLayout from "../components/AdminLayout";

const { Title } = Typography;

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          const formatted = [
            {
              key: data._id,
              adminId: data.adminId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            },
          ];
          setAdminData(formatted);
        } else {
          message.error(data.message || "Failed to load admin data");
        }
      } catch (error) {
        console.error(error);
        message.error("Server error while fetching admin data");
      }
    };

    fetchAdmin();
  }, []);

  const columns = [
    { title: "Admin ID", dataIndex: "adminId", key: "adminId" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <AdminLayout>
      <div>
      <Title level={3} className="admin-title">Admin Details</Title>

        <Table
          columns={columns}
          dataSource={adminData}
          bordered
          pagination={false}
          style={{ marginTop: "1rem" }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
