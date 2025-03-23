import React from 'react';
import { Form, Input,message } from 'antd';
import { Link } from 'react-router-dom';
import "../styles/RegisterStyles.css";

const Register = () => {
  const onFinishHandler = async (values) => {
    
    console.log(`register values:`, values); // instead of stringifying

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await res.json();
      if (res.ok) {
        message.success("Registration successful. Please log in.");
        window.location.href = "/admin/login";
      } else {
        message.error(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong.");
    }
  };
  

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="card p-5 register-form"
        >
          <h3>Admin Sign Up</h3>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Valid email is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            Register
          </button>

          <Link to="/admin/login" className="m-4">
            Already a user? Login here
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
