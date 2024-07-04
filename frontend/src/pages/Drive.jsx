/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Card } from "antd";
import "../style/card.css";
import "../style/drive.css";

export default function Drive() {
  const [conducteurAnnonces, setConducteurAnnonces] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/get_conducteurs")
      .then((response) => {
        setConducteurAnnonces(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des annonces conducteurs :",
          error
        );
      });
  }, []);

  return (
    <div className="content6">
      <div className="cards-container">
        {conducteurAnnonces.map((annonce) => (
          <Card
            key={annonce.ID_Annonce}
            type="inner"
            title="Annonce Conducteur"
            extra={<a href="#">Voir plus</a>}
            style={{ marginBottom: "20px", width:"100%" }}
          >
            <div className="flex">
              <div className="block">
                <p>{`${annonce.date} ${annonce.heure}`}</p>
                <div style={{ display: "flex", gap: "2px" }}>
                  <p>{annonce.position_depart}</p>
                  <img src="/images/right_32px.png" alt="" width={25} height={25}/>
                  <p>{annonce.position_arrive}</p>
                </div>
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
                <img src="/images/checkmark_yes_64px.png" alt="logo" />+
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
