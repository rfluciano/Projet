/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import "../style/home.css";
import axiosClient from "../axiosClient.jsx";
import Footer from "../pages/Footer";
import { useStateContext } from "../context/ContextProvider";
import AccountMenu from "../objets/dropdown.jsx";
import App from "../objets/dropdown.jsx";
import socket from "../socket";
// import NotificationComponent from '../objets/notification.jsx';// import "./style/style.css";


export default function ClientComponent() {
  const { membre, token, setMembre, setToken, notification } = useStateContext();
  const navigate = useNavigate();
  const [isSousNavVisible, setIsSousNavVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { membre_connected } =  useStateContext();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token, navigate]);

  useEffect(() => {
    // Listen for Socket.IO events here
    const handleUserLoggedIn = (userData) => {
      setIsLoggedIn(true);
      setMembre(userData.firstName);
      setToken(userData.token);
    };

    const handleUserLoggedOut = () => {
      setIsLoggedIn(false);
      setMembre(null);
      setToken(null);
    };

    socket.on("userLoggedIn", handleUserLoggedIn);
    socket.on("userLoggedOut", handleUserLoggedOut);

    // Clean up socket connection on component unmount
    return () => {
      socket.off("userLoggedIn", handleUserLoggedIn);
      socket.off("userLoggedOut", handleUserLoggedOut);
    };
  }, [setMembre, setToken]);

  const handleNavigation = (path) => () => {
    navigate(`/client/${path}`);
  };

  const home = () => navigate("/client/home");
  const about = () => navigate("/client/about");
  const handleServiceClick = () => {
    setIsSousNavVisible(!isSousNavVisible);
    navigate("/client/service");
  };
  const handleServiceHover = () => setIsSousNavVisible(true);
  const handleServiceLeave = () => setIsSousNavVisible(false);
  const handleSousNavHover = () => setIsSousNavVisible(true);
  const handleSousNavLeave = () => setIsSousNavVisible(false);
  const contact = () => navigate("/client/contact");
  const drive = () => navigate("/client/annonce");
  const ride = () => navigate("/client/rechercher");
  const help = () => navigate("/client/help");

  const sousNavStyle = {
    backgroundColor: "white",
    zIndex: 10000,
    listStyle: "none",
    padding: "10px",
    border: "1px solid white",
    borderRadius: "10px",
    display: isSousNavVisible ? "block" : "none",
    position: "absolute",
    width: "max-content",
    textAlign: "center",
    top: "137%",
    left: "33%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    // Écoute de l'événement userData envoyé par le serveur
    socket.on("userData", (userData) => {
      console.log("Received userData from server:", userData);
      // Utilisez les données utilisateur comme nécessaire dans votre application
    });

    return () => {
      socket.off("userData");
    };
  }, []);

  return (
    <div className="content">
      {/* <NotificationComponent userId={userId} /> */}
      <div className="top">
        <header>
          <div className="container">
            <div className="col6">
              <img src="/images/project-logo.png" height="60vh" className="logo" />
            </div>
            <div className="col6">
                <ul className="topnav">
                  <li className="nav2">
                    <App />
                  </li>
                </ul>
            </div>
            <div className="clearfix" />
          </div>

          <div className="header-bottom">
            <div className="container">
              <ul className="bottomnav">
                <li className="active" onClick={home}>
                  <button className="nav">
                    <p>Accueil</p>
                  </button>
                </li>
                <li className="active" onClick={drive}>
                  <button className="nav">
                    <p>Annonces</p>
                  </button>
                </li>
                <li className="active" onClick={ride}>
                  <button className="nav">
                    <p>Rechercher</p>
                  </button>
                </li>
                {/* <li
                  onClick={handleServiceClick}
                  className="active"
                  onMouseEnter={handleServiceHover}
                  onMouseLeave={handleServiceLeave}
                >
                  <button className="nav">
                    <p>Service</p>
                  </button>
                  <ul
                    className="sous-nav"
                    style={sousNavStyle}
                    onMouseEnter={handleSousNavHover}
                    onMouseLeave={handleSousNavLeave}
                  >
                    <li>
                      <button className="nav3" onClick={about}>
                        <p> propos</p>
                      </button>
                    </li>
                    <li>
                      <button className="nav3" onClick={contact}>
                        <p>Contact</p>
                      </button>
                    </li>
                    <li>
                      <button className="nav3" onClick={help}>
                        <p>Aide</p>
                      </button>
                    </li>
                  </ul>
                </li> */}
              </ul>
              <div className="clearfix" />
            </div>
          </div>
        </header>
      </div>

      <Outlet />

      <Footer />
    </div>
  );
}
