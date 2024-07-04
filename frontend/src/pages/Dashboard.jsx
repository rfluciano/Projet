/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css"
import { useStateContext } from "../context/ContextProvider"; // Importez le hook useStateContext
import Reservation from "./Reservation";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { token } = useStateContext(); // Récupérez le token à partir du contexte

  // Vérifie si un token est présent
  useEffect(() => {
    // Ici, vous pouvez ajouter votre logique pour vérifier si un token est présent.
    // Par exemple, si vous stockez le token dans le localStorage, vous pouvez faire :
    setIsLoggedIn(!!token); // Met à jour isLoggedIn en fonction de la présence du token.
  }, [token]); // Utilisez le token comme dépendance

  // Redirige l'utilisateur vers la page d'accueil ("/home") si le token est absent
  useEffect(() => {
    if (!token) {
      navigate("/home"); // Redirection vers la page d'accueil ("/home")
    }
  }, [token, navigate]); // Utilisez le token et navigate comme dépendances

  const profil = () => {
    navigate("../profil");
  }

  const reservation = () => {
    navigate("../reservation")
  }

  const historique = () => {
    navigate("../mesalertes")
  }

  const annonce = () => {
    navigate("../mesannonce");
  }
  // Rendu du composant Dashboard
  return (
    <div className="content8">
      <div className="dashboard">
        <div className="topeo">Mon tableau de bord</div>
        <div className="inside">
          <div className="card" onClick={profil}>Mon profil</div>
        <div className="card" onClick={reservation}>Mes réservations</div>
        <div className="card" onClick={annonce}>Mes annonces</div>
        <div className="card" onClick={historique}>Mes alertes</div>
        </div>
      </div>
    </div>
  );
}