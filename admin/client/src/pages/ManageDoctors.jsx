import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Select,
} from 'antd';
import AdminLayout from '../components/AdminLayout';

const { Title } = Typography;
const { Search } = Input;

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors/all');
      const data = await res.json();
      if (res.ok) {
        setDoctors(data);
        setFilteredDoctors(data);
      } else {
        message.error(data.message || 'Failed to load doctors');
      }
    } catch (err) {
      console.error(err);
      message.error('Server error');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const lower = value.trim().toLowerCase();

    const filtered = doctors.filter((doc) =>
      doc.first_name?.toString().trim().toLowerCase().includes(lower) ||
      doc.last_name?.toString().trim().toLowerCase().includes(lower) ||
      doc.email?.toString().trim().toLowerCase().includes(lower) ||
      doc.specialized?.toString().trim().toLowerCase().includes(lower) ||
      doc.gender?.toString().trim().toLowerCase().includes(lower) ||
      doc.mobile_number?.toString().trim().toLowerCase().includes(lower)
    );

    setFilteredDoctors(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/doctors/remove/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        message.success('Doctor removed successfully');
        fetchDoctors();
      } else {
        message.error(data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error(err);
      message.error('Server error');
    }
  };

  const handleEdit = (record) => {
    setEditingDoctor(record);
    form.setFieldsValue(record);
  };

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const res = await fetch(`/api/doctors/update/${editingDoctor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success('Doctor updated');
        setEditingDoctor(null);
        fetchDoctors();
      } else {
        message.error(data.message || 'Failed to update');
      }
    } catch (err) {
      console.error(err);
      message.error('Server error');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'doctor_id', key: 'doctor_id' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Specialized', dataIndex: 'specialized', key: 'specialized' },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'Other', value: 'other' },
      ],
      onFilter: (value, record) =>
        record.gender?.toString().trim().toLowerCase() === value,
    },
    { title: 'Mobile', dataIndex: 'mobile_number', key: 'mobile_number' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEdit(record)}
            type='primary'
            style={{ marginRight: 8 }}
            className='edit-button'
          >
            Edit
          </Button>
          <Button className='delete-button' danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
      <AdminLayout>
      <Title level={3} className = "admin-title"> Manage Doctors</Title>
        <Search
          placeholder='Search doctors...'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          className='search-bar'
        />
      <Table columns={columns} dataSource={filteredDoctors} rowKey="_id" />

      <Modal
        title='Edit Doctor'
        open={!!editingDoctor}
        onCancel={() => setEditingDoctor(null)}
        onOk={handleUpdate}
        okText='Update'
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='first_name' label='First Name'>
            <Input />
          </Form.Item>
          <Form.Item name='last_name' label='Last Name'>
            <Input />
          </Form.Item>
          <Form.Item name='email' label='Email'>
            <Input />
          </Form.Item>
          <Form.Item name='specialized' label='Specialized'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' label='Gender'>
            <Select>
              <Select.Option value='Male'>Male</Select.Option>
              <Select.Option value='Female'>Female</Select.Option>
              <Select.Option value='Other'>Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='mobile_number' label='Mobile Number'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageDoctors;
