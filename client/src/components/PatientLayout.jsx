import React from 'react';
import logo from "../assets/logo.png"; 
import { Layout, Menu, theme } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientLayout.css';

const { Sider, Content } = Layout;

const PatientLayout = ({ children }) => {
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem('patient')) || {};

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }} className='patient-layout'>
      <Sider width={250} className='patient-sider'>
        <div className='patient-logo'>
          <img src={logo} alt='Ikigai Logo' className='logo-img' />
          <span className="company-name">Ikigai</span>
        </div>

        <Menu
          mode='inline'
          defaultSelectedKeys={['/patient/dashboard']}
          onClick={e => navigate(e.key)}
          items={[
            {
              key: '/patient/dashboard',
              icon: <HomeOutlined />,
              label: 'Dashboard'
            },
            {
              key: '/patient/appointments',
              icon: <CalendarOutlined />,
              label: 'Appointments'
            },
            {
              key: '/patient/searchDoctors',
              icon: <CalendarOutlined />,
              label: 'Doctors'
            },
            {
              key: '/patient/bills',
              icon: <CalendarOutlined />,
              label: 'Bill'
            },
            {
              key: '/patient/profile',
              icon: <UserOutlined />,
              label: 'Profile'
            },
            {
              type: 'divider'
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: 'Settings'
            },
            {
              key: 'dark-mode',
              icon: <BulbOutlined />,
              label: 'Dark Mode'
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('patient');
                window.location.href = '/patient/login';
              }
            }
          ]}
        />
        <div className='patient-footer'>
          <div className='patient-user-info'>
            <div className='avatar'>{patient.firstName?.charAt(0)}</div>
            <div>
              <div className='name'>{patient.firstName || 'Patient'}</div>
              <div className='email'>{patient.email || 'patient@example.com'}</div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className="patient-layout">
        <Content className="patient-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PatientLayout;
