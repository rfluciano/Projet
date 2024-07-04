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

export default function DefaultComponent() {
  const { membre, token, setMembre, setToken, notification } = useStateContext();
  const navigate = useNavigate();
  const [isSousNavVisible, setIsSousNavVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/client/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    // Listen for Socket.IO events here
    socket.on("userLoggedIn", (userId) => {
      setIsLoggedIn(true);
      setMembre(/* Update membre state based on user data */);
    });

    socket.on("userLoggedOut", () => {
      setIsLoggedIn(false);
      setMembre(null);
    });

    // Clean up socket connection on component unmount
    return () => socket.disconnect();
  }, []);

  const home = () => navigate("/home");
  const about = () => navigate("/about");
  const handleServiceClick = () => {
    setIsSousNavVisible(!isSousNavVisible);
    navigate("/service");
  };
  const handleServiceHover = () => setIsSousNavVisible(true);
  const handleServiceLeave = () => setIsSousNavVisible(false);
  const handleSousNavHover = () => setIsSousNavVisible(true);
  const handleSousNavLeave = () => setIsSousNavVisible(false);
  const contact = () => navigate("/contact");
  const drive = () => navigate("/drive");
  const ride = () => navigate("/rechercher");
  const help = () => navigate("/help");
  const signup = () => navigate("/signup");
  const login = () => navigate("/login");

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

  return (
    <div className="content">
      <div className="top">
        <header>
          <div className="container">
            <div className="col6">
              <a href="/home"><img src="./images/project-logo.png" height="60vh" className="logo" /></a>
            </div>
            <div className="col6">
              {isLoggedIn ? (
                <ul className="topnav">
                  <li className="nav2">
                    <App />
                  </li>
                </ul>
              ) : (
                <ul className="topnav">
                  <li>
                    <button className="nav2" onClick={signup}>
                      <p>Signup</p>
                    </button>
                  </li>
                  <li>
                    <button onClick={login} className="btn-r">
                      Login
                    </button>
                  </li>
                </ul>
              )}
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
                    <p>Annonce</p>
                  </button>
                </li>
                <li className="active" onClick={ride}>
                  <button className="nav">
                    <p>Rechercher</p>
                  </button>
                </li>
                <li
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
                        <p>About</p>
                      </button>
                    </li>
                    <li>
                      <button className="nav3" onClick={contact}>
                        <p>Contact</p>
                      </button>
                    </li>
                    <li>
                      <button className="nav3" onClick={help}>
                        <p>Help</p>
                      </button>
                    </li>
                  </ul>
                </li>
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
