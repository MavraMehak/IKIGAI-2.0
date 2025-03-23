import React, { useEffect, useState } from "react";
import { Table, Button, Input, message, Typography } from "antd";
import AdminLayout from "../components/AdminLayout";

const { Title } = Typography;
const { Search } = Input;

const ApproveDoctors = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/doctors/requests");
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
        setFiltered(data);
      } else {
        message.error(data.message || "Failed to load doctor requests");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    }
  };

  const handleAction = async (id, type) => {
    try {
        console.log("Calling:", `/api/doctors/${type}/${id}`, "Method:", type === "approve" ? "POST" : "DELETE");

      const res = await fetch(`/api/doctors/${type}/${id}`, {
        
        method: type === "approve" ? "POST" : "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        message.success(data.message);
        fetchRequests(); // Refresh list
      } else {
        message.error(data.message || `${type} failed`);
      }
    } catch (err) {
      console.error(err);
      message.error(`Server error during ${type}`);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const lower = value.toLowerCase();
    const filteredList = requests.filter((doc) =>
      Object.values(doc).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
    setFiltered(filteredList);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    { title: "First Name", dataIndex: "doc_Fname", key: "doc_Fname" },
    { title: "Last Name", dataIndex: "doc_Lname", key: "doc_Lname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Specialized", dataIndex: "specialized", key: "specialized" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Mobile", dataIndex: "mobile_number", key: "mobile_number" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleAction(record._id, "approve")}
            style={{ marginRight: "8px" }}
            className="approve-button"
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => handleAction(record._id, "reject")}
            className="reject-button"
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Title level={3} className="admin-title">Approve Doctor Requests</Title>
      <Search
        placeholder="Search doctor..."
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
        allowClear
        className = "search-bar"
      />
      <Table columns={columns} dataSource={filtered} rowKey="_id" />
    </AdminLayout>
  );
};

export default ApproveDoctors;
