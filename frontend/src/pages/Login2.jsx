/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axios from "axios";

export default function Login2() {
  const emailRef = createRef();
  const motdepasseRef = createRef();
  const onSubmit = (ev) => {
    ev.preventDefault();
    // console.log(test);
    const payload = {
      Email: emailRef.current.value,
      MotDePasse: motdepasseRef.current.value,
    };
    console.log(payload);
    axios.post("http://localhost:8000/api/login", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
            console.log("Erreur:", err);
        }
      });
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Se connecter</h1>

          <input className="input" ref={emailRef} type="email" placeholder="Email" />
          <input className="input"
            ref={motdepasseRef}
            type="password"
            placeholder="Mot de passe"
          />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Pas de compte? <Link to="/signup">Créez votre compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
