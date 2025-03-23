import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Typography,
  message,
} from "antd";
import AdminLayout from "../components/AdminLayout";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = TimePicker;
const { Option } = Select;

const ScheduleShift = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Shift values:", values);
    message.success("Shift scheduled (mock). Implement API next!");
  };

  return (
    <AdminLayout>
      <Title level={3}>📅 Schedule Shift</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 500 }}
      >
        <Form.Item
          name="doctor_id"
          label="Doctor"
          rules={[{ required: true, message: "Please select a doctor" }]}
        >
          <Select placeholder="Select a doctor">
            <Option value="doc1">Dr. Ahmed</Option>
            <Option value="doc2">Dr. Sarah</Option>
            <Option value="doc3">Dr. Bilal</Option>
            {/* TODO: Replace with fetched doctor list later */}
          </Select>
        </Form.Item>

        <Form.Item
          name="shift_date"
          label="Shift Date"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time_range"
          label="Shift Time"
          rules={[{ required: true, message: "Please pick time range" }]}
        >
          <RangePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select shift status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Available">Available</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Schedule Shift
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default ScheduleShift;
