/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider, useStateContext} from './context/ContextProvider.jsx'
import "./style/index.css";
import "../src/input.css"
import "../src/output.css";
import socket from './socket';

function App() {
  
  return <div className="App">App</div>;
}

export default App;
