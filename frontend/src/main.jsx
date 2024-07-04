/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style/index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from './context/ContextProvider.jsx';
import {NextUIProvider} from "@nextui-org/react";
import "./output.css"
import NotificationComponent from './objets/notification.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <ContextProvider>
      <RouterProvider router={router} />
      
    </ContextProvider>
    </NextUIProvider>
  </React.StrictMode>
)
