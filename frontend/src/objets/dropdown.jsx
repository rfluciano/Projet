/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { DownOutlined, LogoutOutlined, TableOutlined, UserOutlined,FileAddFilled, FileAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axiosClient'; // Assurez-vous que cette importation correspond à votre structure de projet

const App = () => {
  const navigate = useNavigate();
  const { membre_connected, token, setMembre, setToken, notification } = useStateContext();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleButtonClick = (e) => {
    navigate("/client/dashboard");
  };

  const handleMenuClick = (e) => {
  };

  const handleDashboardClick = () => {
    navigate("/client/dashboard");
  };

  const handleAccountClick = () => {
    navigate("/client/profil");
  };

  const handleAnnonceClick = () => {
    navigate("/client/annonce_form");
  };

  const handleLogoutClick = () => {
    axiosClient.post("/logout").then(() => {
      setMembre({});
      setToken(null);
    });
  };



  const items = [
    {
      label: "Tableau de bord",
      key: "1",
      icon: <TableOutlined />,
      onClick: handleDashboardClick,
    },
    {
      label: "Mon profil",
      key: "2",
      icon: <UserOutlined />,
      onClick: handleAccountClick,
    },
    {
      label: "Publier mon annonce",
      key: "3",
      icon: < FileAddOutlined/>,
      onClick: handleAnnonceClick,
    },
    {
      label: "Se déconnecter",
      key: "4",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogoutClick,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown.Button style={{height:20}} menu={menuProps} onClick={handleButtonClick}>
        {membre_connected ? membre_connected.Prenom : ''}
      </Dropdown.Button>
    </Space>
  );
};

export default App;
