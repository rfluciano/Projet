/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../style/ride.css";
import socket from "../socket.jsx";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "../style/card.css";
import axiosClient from "../axiosClient";

export default function Ride() {
  const [passagerAnnonces, setPassagerAnnonces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch des annonces passagers
    axiosClient.get("/get_passagers")
      .then(response => {
        setPassagerAnnonces(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des annonces passagers :", error);
      });

    // Écoute des événements du socket
    socket.on("nva", data => {
      console.log("Data reçue via socket:", data);
      // Logique personnalisée pour gérer les données reçues
    });

    socket.on("update", () => {
      navigate("/home");
    });

    // Cleanup on component unmount
    return () => {
      socket.off("nva");
      socket.off("update");
    };
  }, [navigate]);

  return (
    <div className='content7'>
      <div className="cards-container">
        {passagerAnnonces.map(annonce => (
          <Card
            key={annonce.ID_Annonce}
            type="inner"
            title="Annonce Passager"
            extra={<a href="#">Voir plus</a>}
            style={{ marginBottom: "20px", width:"100%" }}
          >
            <div className="flex">
              <div className="block">
                <p>{`${annonce.date} ${annonce.heure}`}</p>
                <p>{annonce.position_depart}</p>
                <p>{annonce.position_arrive}</p>
              </div>
              <div className="box">
                <label>Place</label>
                <p>{annonce.place_disponible}</p>
              </div>
              <div className="box">
                <label>Prix</label>
                <p>{annonce.prix_par_place} Ar</p>
              </div>
              <button className="reserve">
                <p>Reserver</p>
                <img src="/images/checkmark_yes_64px.png" alt="logo" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
