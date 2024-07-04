/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import axiosClient from "../axiosClient.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const prenomRef = createRef();
  const phoneRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setMembre, token, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);


  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      Nom: nameRef.current.value,
      Prenom: prenomRef.current.value, // Ajout du prénom
      Email: emailRef.current.value,
      MotDePasse: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      TypeMembre: "standard", // Ajout du type de membre
      NumeroTelephone: phoneRef.current.value, // Ajout du numéro de téléphone
    };

    axiosClient
      .post("/signup", payload)
      .then((response) => {
        setMembre(response.data.membre);
        setToken(response.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
      console.log();
  };

  useEffect(() => {
    if (token) {
      // Vérifie si le token est absent
      navigate("/dashboard"); // Redirection vers la page d'accueil ("/home")
    }
  }, [token, navigate]); 

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Créez un compte</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input className="input" ref={nameRef} type="text" placeholder="Nom " required/>
          <input className="input" ref={prenomRef} type="text" placeholder="Prénom" required/>
          <input className="input" ref={phoneRef} type="text" placeholder="Numéro de téléphone" required/>
          <input className="input" ref={emailRef} type="email" placeholder="Adresse email" required/>
          <input className="input" ref={passwordRef} type="password" placeholder="Mot de passe" required/>
          <input className="input"
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Confirmer mot de passe"
          />
          <button className="btn btn-block">Confirmer</button>
          <br />
          <p className="message">
            Vous avez un compte? <Link to="/login">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
