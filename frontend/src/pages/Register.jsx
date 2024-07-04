/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify-modernize";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { display } from "@mui/system";

const Register = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [ERR, setERR] = useState([]);

  function Notify(xy) {
    toast.error(xy, {
      position: "top-center",
    });
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/register`,
        {
          nom_tech: nom,
          prenom_tech: prenom,
          email_tech: email,
          mot_de_passe: mot_de_passe,
        }
      );
      console.log(response.data);
    } catch (error) {
      const response = error.response;
      // setERR(error.reponse.data.errors);
      // console.log(ERR)
      if (response && response.status === 422) {
        setERR(response.data.errors);
        console.log(ERR);
      }
    }
  };

  useEffect(() => {
    setMot_de_passe([""]);
    setEmail([""]);
    if (ERR) {
      Object.keys(ERR).map((key) => Notify(ERR[key][0]));
    }
  }, [ERR]);

  return (
    <div
      style={{
        width: "60vh",
        height: "70vh",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <ToastContainer />
      <h1>Créer un compte</h1>
      <div className="floating-label" id="firstInput">
        <label htmlFor="description">Nom</label>
        <input
          style={{ width: 340 }}
          value={nom}
          id=""
          className="entryArea"
          type="email"
          onChange={(ev) => setNom(ev.target.value)}
          placeholder=" "
        />
      </div>
      <div className="floating-label" id="firstInput">
        <label htmlFor="description">Prénom</label>
        <input
          style={{ width: 340 }}
          value={prenom}
          id=""
          className="entryArea"
          type="email"
          onChange={(ev) => setPrenom(ev.target.value)}
          placeholder=" "
        />
      </div>
      <div className="floating-label" id="firstInput">
        <label htmlFor="description">Email</label>
        <input
          style={{ width: 340 }}
          value={email}
          id=""
          className="entryArea"
          type="email"
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder=" "
        />
      </div>
      <div className="floating-label">
        <label htmlFor="description">Mot de passe</label>
        <input
          style={{ width: 340 }}
          id="description"
          className="entryArea"
          type="password"
          onChange={(ev) => setMot_de_passe(ev.target.value)}
          placeholder=" "
        />
      </div>
      <p>
        Vous avez déjà un compte ?<Link to="/login">Se connecter</Link>{" "}
      </p>
      <button
        onClick={handleRegister}
        className="btn-save"
        style={{ display: "flex", alignContent: "center", marginLeft: "34%" }}
      >
        S'inscrire
      </button>
    </div>
  );
};

export default Register;
