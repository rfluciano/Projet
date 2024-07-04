/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext({
  membre_connected: null,
  token: null,
  notification: null,
  setMembre: () => {},
  setToken: () => {},
  setNotification: () => {},
  message: () => {} // Ajout de la méthode message
});

export const ContextProvider = ({ children, updateUserState }) => {
  const [membre_connected, setMembre] = useState(
    JSON.parse(localStorage.getItem("membre")) || null
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setMembreAndLocalStorage = (membre) => {
    setMembre(membre);
    if (membre) {
      localStorage.setItem("membre", JSON.stringify(membre));
    } else {
      localStorage.removeItem("membre");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const message = (content) => {
    toast(content); // Utilisation de Toastify pour afficher le message
  };

  return (
    <StateContext.Provider
      value={{
        membre_connected,
        setMembre: setMembreAndLocalStorage,
        token,
        setToken,
        notification,
        setNotification,
        message // Passage de la méthode message dans le contexte
      }}
    >
      {children}
      <ToastContainer /> 
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
