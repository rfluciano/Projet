/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Dropdown, message, Menu } from "antd";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const { membre_connected, token, setMembre, setToken, notification } =
    useStateContext();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDashboardClick = () => {
    navigate("/dashboard");
    message.info("Clicked on Dashboard");
  };

  const handleAccountClick = () => {
    navigate("/profil");
    message.info("Clicked on My Account");
  };

  const handleLogoutClick = () => {
    axiosClient.post("/logout").then(() => {
      setMembre({});
      setToken(null);
    });
    message.info("Clicked on Logout");
  };

  const items = [
    {
      label: "Dashboard",
      key: "1",
      icon: <TableOutlined />,
      onClick: handleDashboardClick,
    },
    {
      label: "My account",
      key: "2",
      icon: <UserOutlined />,
      onClick: handleAccountClick,
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogoutClick,
    },
  ];

  const handleHover = () => {
    setDropdownVisible(true);
  };

  const handleMenuLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <Dropdown
      overlay={<Menu items={items}  />}
    >
      <span onMouseEnter={handleHover}>
        <Dropdown.Button
          style={{ height: "20px" }}
          placement="bottom"
          icon={<UserOutlined />}
        >
          {membre_connected.Prenom}
        </Dropdown.Button>
      </span>
    </Dropdown>
  );
};

export default App;
