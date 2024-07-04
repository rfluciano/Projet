/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import "../style/profil.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profil() {
  const { membre_connected, setMembre, message } = useStateContext();
  const navigate = useNavigate();

  const [Nom, setNom] = useState(membre_connected.Nom || "");
  const [Prenom, setPrenom] = useState(membre_connected.Prenom || "");
  const [Email, setEmail] = useState(membre_connected.Email || "");
  const [NumeroTelephone, setNumeroTelephone] = useState(membre_connected.NumeroTelephone || "");
  const [HaveACar, setHaveACar] = useState(membre_connected.HaveACar || false);

  const gotoDashboard = () => {
    navigate("../dashboard");
  };

  const onSubmit = async (e) => {
    const ID_Membre = membre_connected.ID_Membre;
    e.preventDefault();
    const payload = {
      Nom,
      Prenom,
      Email,
      NumeroTelephone,
      HaveACar
    };

    try {
      await axiosClient.put(`/Update_membres/${ID_Membre}`, payload);
      setMembre({ ...membre_connected, ...payload });
      toast.success("Votre profil a bien été modifié .", {
        position: "bottom-right",
      });    } catch (error) {
      toast.error("Erreur: Nous avez eu un problème lors de la modification du profil.", {
        position: "bottom-right",
      });      console.error("Erreur lors de l'enregistrement des modifications :", error);
    }
  };

  return (
    <div className="content9">
      <div className="cardindal">
        <div className="toptop">
          <button className="retour" onClick={gotoDashboard}>
            <img src="/images/left.png" width={"16px"} alt="retour" />
            Retour
          </button>
          Mon Profil
        </div>
        <div className="izy2">
          <form action="" method="get" onSubmit={onSubmit}>
            <label htmlFor="nom">Nom:</label>
            <input
              className="input"
              label="Nom"
              type="text"
              name="nom"
              value={Nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <label htmlFor="prenom">Prénom:</label>
            <input
              className="input"
              label="Prenom"
              type="text"
              name="prenom"
              value={Prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="input"
              label="Email"
              type="email"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="numeroTelephone">Numéro de téléphone:</label>
            <input
              className="input"
              label="Numero Telephone"
              type="text"
              name="numeroTelephone"
              value={NumeroTelephone}
              onChange={(e) => setNumeroTelephone(e.target.value)}
            />
            {/* <label htmlFor="haveACar">J'ai une voiture:</label> */}
            <button className="btn btn-block" id="letabory" type="submit">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
