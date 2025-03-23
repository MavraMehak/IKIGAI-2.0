import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterStyles.css";

const Login = () => {
  const navigate = useNavigate(); 

  const onFinishHandler = async (values) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success("Login successful!");
        localStorage.setItem("token", data.token); 
        localStorage.setItem("admin", JSON.stringify(data.admin));

        navigate("/admin/dashboard"); 
      } else {
        message.error(data.message || "Login failed");
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
          <h3>Login</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required  />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/admin/register" className="m-4">
            Not a user? Sign Up here
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
