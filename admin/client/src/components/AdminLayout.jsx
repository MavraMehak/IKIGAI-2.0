import React from 'react'
import logo from "../assets/logo.png"; 
import { Layout, Menu, theme } from 'antd'
import {
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminLayout.css'

const { Sider, Content } = Layout

const AdminLayout = ({ children }) => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin')) || {}

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }} className='admin-layout'>
      <Sider width={250} className='admin-sider'>
        <div className='admin-logo'>
          <img src={logo} alt='Ikigai Logo' className='logo-img' />
          <span className="company-name">Ikigai</span>
        </div>

        <Menu
          mode='inline'
          defaultSelectedKeys={['/admin/dashboard']}
          onClick={e => navigate(e.key)}
          items={[
            {
              key: '/admin/dashboard',
              icon: <AppstoreOutlined />,
              label: 'Dashboard'
            },

            {
              key: '/admin/manage-doctors',
              icon: <UserOutlined />,
              label: 'Manage Doctors'
            },
            {
              key: '/admin/approve-doctors',
              icon: <TeamOutlined />,
              label: 'Approve Doctors'
            },
            {
              key: '/admin/schedule-shift',
              icon: <CalendarOutlined />,
              label: 'Schedule Shift'
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
                localStorage.removeItem('token')
                localStorage.removeItem('admin')
                window.location.href = '/admin/login'
              }
            }
          ]}
        />
        <div className='admin-footer'>
          <div className='admin-user-info'>
            <div className='avatar'>{admin.firstName?.charAt(0)}</div>
            <div>
              <div className='name'>{admin.firstName || 'Admin'}</div>
              <div className='email'>{admin.email || 'admin@example.com'}</div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className = "admin-layout">
        <Content className="admin-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
