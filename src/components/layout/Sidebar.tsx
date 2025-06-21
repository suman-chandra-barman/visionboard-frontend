import React from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Title from "antd/es/typography/Title";

const menuItems = [
  {
    key: "Dashboard",
    icon: React.createElement(HomeOutlined),
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    key: "Eye Glasses",
    icon: React.createElement(ProductOutlined),
    label: "Eye Glasses",
    children: [
      {
        key: "add-eyeglasses",
        icon: React.createElement(PlusOutlined),
        label: <NavLink to="/dashboard/add-eyeglasses">Add Eyeglasses</NavLink>,
      },
      {
        key: "eyeglasses",
        icon: React.createElement(ShoppingOutlined),
        label: (
          <NavLink to="/dashboard/eyeglassesList">Eyeglasses List</NavLink>
        ),
      },
       
    ],
  },
  {
    key: 3,
    icon: React.createElement(ShoppingCartOutlined),
    label: <NavLink to="/sales">Sales</NavLink>,
  },
  {
    key: 4,
    icon: React.createElement(UserOutlined),
    label: <NavLink to="users">Users</NavLink>,
  },
];

const Sidebar = () => {
  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 5,
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          padding: "10px 5px",
        }}
      >
        <Link to="/">
          <Title level={3} style={{ textAlign: "center", fontWeight: "bold" }}>
            Vision<span style={{ color: "#1677ff" }}>Board</span>
          </Title>
        </Link>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
