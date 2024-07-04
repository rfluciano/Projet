/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Card, Popconfirm } from "antd";
import "../style/reservation.css";
import { useStateContext } from "../context/ContextProvider";
import { format } from "date-fns";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import App from "../objets/drawer2";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const { membre_connected } = useStateContext();

  const fetchReservations = async () => {
    const ID_Membre = membre_connected.ID_Membre;
    try {
      const response = await axiosClient.get(`/getmyreservations/${ID_Membre}`);
      setReservations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await axiosClient.delete(`/reservation_delete/${id}`);
      console.log("Réservation annulée avec succès");
      fetchReservations(); // Mise à jour des réservations après annulation
    } catch (error) {
      console.error("Erreur lors de l'annulation de la réservation :", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();

    socket.on("nvr", (data) => {
      console.log("Data reçue via socket:", data);
      fetchReservations();
    });

    socket.on("update", () => {
      navigate("/home");
    });

    return () => {
      socket.off("nvr");
      socket.off("update");
    };
  }, [navigate]);

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
          Mes Réservations
        </div>
        <div className="tab-container3">
          <div className="cards-container3">
            {reservations.length === 0 ? (
              <div className="nodata">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "px",
                  fontSize: "20px",
                  color: "var(--darkblue)",
                }}
              >
                Aucune réservation pour le moment
              </p>
              <img src="/images/no_data.jpg" alt="" width={"600vh"} />
              </div>
            ) : (
              reservations.map((reservation) => (
                <Card
                  key={reservation.ID_Reservation}
                  type="inner"
                  title={reservation.annonce ? reservation.annonce.ID_Membre : ""}
                  extra={<App/>}
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <div className="flex">
                    <div className="block">
                      <p>
                        Date:{" "}
                        {reservation.annonce.date &&
                          format(
                            new Date(reservation.annonce.date),
                            "dd/MM/yyyy"
                          )}
                      </p>
                      <p>
                        Heure:{" "}
                        {reservation.annonce.heure &&
                          format(
                            new Date("1970-01-01T" + reservation.annonce.heure),
                            "HH:mm"
                          )}
                      </p>
                      <div style={{ display: "flex", gap: "2px" }}>
                        <p>{reservation.annonce.position_depart}</p>
                        <img
                          src="/images/right_32px.png"
                          alt=""
                          width={25}
                          height={25}
                        />
                        <p>{reservation.annonce.position_arrive}</p>
                      </div>
                    </div>
                    <div className="box">
                      <label>Place</label>
                      <p>{reservation.PlacesReservees}</p>
                    </div>
                    <div className="box">
                      <label>Prix / Place</label>
                      <p>{reservation.annonce.prix_par_place} Ar</p>
                    </div>
                    <div className="reserve">
                      <Popconfirm
                        placement="topRight"
                        title={"Annulation"}
                        description={
                          "Êtes-vous sûr de vouloir annuler cette réservation ?"
                        }
                        okText="Oui"
                        cancelText="Non"
                        onConfirm={() => cancelReservation(reservation.ID_Reservation)}
                      >
                        <button className="reserve-inside">
                          <p>Annuler</p>
                          <img src="/images/multiply.png" alt="logo" />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
