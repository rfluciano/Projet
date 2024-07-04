/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Card } from "antd";
import "../style/reservation.css";
import { useStateContext } from "../context/ContextProvider";
import { format } from "date-fns";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Alertes() {
  const [alertes, setAlertes] = useState([]);
  const { membre_connected } = useStateContext();
  const navigate = useNavigate();

  const fetchAlertes = async () => {
    if (!membre_connected) {
      console.error("Membre connecté est undefined");
      return;
    }

    const ID_Membre_Proprietaire = membre_connected.ID_Membre;
    try {
      const response = await axiosClient.get(
        `/getmyalertes/${ID_Membre_Proprietaire}`
      );
      setAlertes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  const refuser = async (id) => {
    try {
      await axiosClient.put(`/reservation_refuse/${id}`);
      console.log("Réservation refusée avec succès");
      fetchAlertes(); // Re-fetch alertes after updating status
    } catch (error) {
      console.error("Erreur lors du refus de la réservation :", error);
    }
  };

  const accepter = async (id) => {
    try {
      await axiosClient.put(`/reservation_accept/${id}`);
      console.log("Réservation acceptée avec succès");
      fetchAlertes(); // Re-fetch alertes after updating status
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la réservation :", error);
    }
  };

  useEffect(() => {
    fetchAlertes();
  }, []);

  useEffect(() => {
    // Écoute des événements du socket
    const handleNvr = (data) => {
      console.log("Data reçue via socket:", data);
      fetchAlertes();
    };

    socket.on("nvr", handleNvr);

    // Cleanup on component unmount
    return () => {
      socket.off("nvr", handleNvr);
    };
  }, []);

  const gotoDashboard = () => {
    navigate("../dashboard");
  };

  return (
    <div className="content21">
      <div className="bobota">
        <div className="toptop">
          <button className="retour" onClick={gotoDashboard}>
            <img src="/images/left.png" width={"16px"} alt="retour" />
            Retour
          </button>
          Mes Alertes
        </div>
        <div className="tab-container3">
          <div className="cards-container3">
            {alertes.length === 0 ? (
              <div className="nodata">
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "px",
                    fontSize: "30px",
                    color: "var(--darkblue)",
                  }}
                >
                  Votre boîte d'alerte est vide
                </p>
                <img src="/images/no_data.jpg" alt="" width={"600vh"} />
              </div>
            ) : (
              alertes.map((reservation) => {
                const annonce = reservation.annonce || {};
                const date = annonce.date ? format(new Date(annonce.date), "dd/MM/yyyy") : "";
                const heure = annonce.heure ? format(new Date("1970-01-01T" + annonce.heure), "HH:mm") : "";
                return (
                  <Card
                    key={reservation.ID_Reservation}
                    type="inner"
                    title={"Demande de réservation de l'annonce N°:"+reservation.annonce.ID_Annonce}
                    extra={<a href="#">Voir plus</a>}
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      boxShadow: "var(--box-shadow)",
                    }}
                  >
                    <div className="flex">
                      <div className="block">
                        <p>Réservant : {reservation.Reservant.Nom} {reservation.Reservant.Prenom}</p>
                        <p>Contact: {reservation.Reservant.NumeroTelephone}</p>
                        <div style={{ display: "flex", gap: "2px" }}>
                          <p>{annonce.position_depart || ""}</p>
                          <img
                            src="/images/right_32px.png"
                            alt=""
                            width={25}
                            height={25}
                          />
                          <p>{annonce.position_arrive || ""}</p>
                        </div>
                      </div>
                      <div className="box">
                        <label>Place réservée</label>
                        <p>{reservation.PlacesReservees}</p>
                      </div>
                      <div className="reserve">
                        {reservation.Statut === "En attente" && (
                          <>
                            <button
                              className="reserve-inside"
                              id="refuser"
                              onClick={() => refuser(reservation.ID_Reservation)}
                            >
                              <p>Refuser</p>
                              <img src="/images/multiply.png" alt="logo" />
                            </button>
                            <br />
                            <button
                              className="reserve-inside"
                              id="modifier"
                              onClick={() => accepter(reservation.ID_Reservation)}
                            >
                              <p>Accepter</p>
                              <img
                                src="/images/checkmark_yes_64px.png"
                                alt="logo"
                              />
                            </button>
                          </>
                        )}
                        {reservation.Statut === "Accepted" && (
                          <button className="reserve-inside" id="confirme">
                            <p>Confirmé</p>
                            <img
                              src="/images/checkmark_yes_64px.png"
                              alt="logo"
                            />
                          </button>
                        )}
                        {reservation.Statut === "Refused" && (
                          <button className="reserve-inside" id="refused" disabled>
                            <p>Refusé</p>
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
