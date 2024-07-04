/* eslint-disable no-unused-vars */
import {Link, useNavigate} from "react-router-dom";
import axiosClient from "../axiosClient.jsx";
import {createRef, useEffect} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import axios from "axios";
import socket from "../socket.jsx";

export default function Login() {
  const emailRef = createRef()
  const motdepasseRef = createRef()
  const { setMembre, setToken,token, test, membre_connected } = useStateContext()
  const [message, setMessage] = useState(null)
  const navigate = useNavigate();

  const [ IsLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Ici, vous pouvez ajouter votre logique pour vérifier si un token est présent.
    // Par exemple, si vous stockez le token dans le localStorage, vous pouvez faire :
    setIsLoggedIn(!!token); // Met à jour isLoggedIn en fonction de la présence du token.
  }, [token]); // Utilisez le token comme dépendance

  // Redirige l'utilisateur vers la page d'accueil ("/home") si le token est absent
  useEffect(() => {
    if (token) {
      // Vérifie si le token est absent
      navigate("/dashboard"); // Redirection vers la page d'accueil ("/home")
    }
  }, [token, navigate]); // Utilisez le token et navigate comme dépendances


  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      Email: emailRef.current.value,
      MotDePasse: motdepasseRef.current.value,
    }
    axiosClient.post("/login", payload)
      .then((response) => {
        console.log(response.data);
        setMembre(response.data.membre);
        console.log(membre_connected)
        setToken(response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
      socket.emit("userLoggedIn", payload);
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Se connecter</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input className="input" ref={emailRef} type="email" placeholder="Email" required/>
          <input className="input" ref={motdepasseRef} type="password" placeholder="Mot de passe" required/>
          <button className="btn btn-block">Login</button>
          <p className="message">Pas de compte? <Link to="/signup">Créez votre compte</Link></p>
        </form>
      </div>
    </div>
  )
}
