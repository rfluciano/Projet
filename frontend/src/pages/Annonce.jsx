/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Card, Modal } from "antd";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../style/annonce.css";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import App from "../objets/drawer2";

export default function Annonce() {
  const { membre_connected } = useStateContext();
  const [modal2Open, setModal2Open] = useState(false);
  const [passagerAnnonces, setPassagerAnnonces] = useState([]);
  const [conducteurAnnonces, setConducteurAnnonces] = useState([]);
  const [IdAnnonce, setIdAnnonce] = useState([]);
  const [IdMembre2, setIdMembre2] = useState([]);
  const [Place_Reservees, setPlace_Reservees] = useState(1); // Initialisé à 1

  Place_Reservees;

  const navigate = useNavigate();

  const fetchAnnonces = async () => {
    try {
      const [passagersResponse, conducteursResponse] = await Promise.all([
        axiosClient.get("/get_passagers"),
        axiosClient.get("/get_conducteurs"),
      ]);
      setPassagerAnnonces(passagersResponse.data);
      setConducteurAnnonces(conducteursResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  useEffect(() => {
    fetchAnnonces();

    // Écoute des événements du socket
    socket.on("nva", (data) => {
      console.log("Data reçue via socket:", data);
      fetchAnnonces(); // Actualiser les annonces
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

  const [activeTab, setActiveTab] = useState("passagers");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const reserver = (ID_Annonce, ID_Membre2) => {
    setModal2Open(true);
    setIdAnnonce(ID_Annonce);
    setIdMembre2(ID_Membre2);
  };

  const reserver2 = async () => {
    const ID_Membre = membre_connected.ID_Membre;
    const payload = {
      ID_Annonce: IdAnnonce,
      ID_Membre_Reservant: ID_Membre,
      ID_Membre_Proprietaire: IdMembre2,
      PlacesReservees: Place_Reservees,
      Statut: "En attente",
    };

    console.log("Payload:", payload);

    // Vérifier si le membre réservant est le même que le membre propriétaire
    if (ID_Membre === IdMembre2) {
      toast.error("Erreur: Vous ne pouvez pas réserver votre propre annonce.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await axiosClient.post("/reserver", payload);
      toast.success("Réservation effectuée avec succès.", {
        position: "bottom-right",
      });
      setModal2Open(false);
      // Gérer la réservation réussie ici (par exemple, afficher un message de succès, mettre à jour l'état)
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error("Erreur lors de la création de la réservation.", {
          position: "bottom-right",
        });
        console.error(
          "Erreur lors de la création de la réservation:",
          err.response.data
        );
        // Gérer l'erreur ici (par exemple, afficher un message d'erreur)
      } else {
        toast.error("Erreur inattendue lors de la création de la réservation.", {
          position: "bottom-right",
        });
        console.error(
          "Erreur inattendue lors de la création de la réservation:",
          err
        );
        // Gérer les erreurs inattendues ici
      }
    }
  };

  return (
    <div className="content25">
      <div className="tab-container2">
        <div className="tab-buttons">
          <button
            className={`tab-button ${
              activeTab === "passagers" ? "active" : ""
            }`}
            onClick={() => handleTabClick("passagers")}
          >
            Passagers
          </button>
          <button
            className={`tab-button ${
              activeTab === "conducteurs" ? "active" : ""
            }`}
            onClick={() => handleTabClick("conducteurs")}
          >
            Conducteurs
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "passagers" && (
            <div>
              <div className="cards-container2">
                {passagerAnnonces.map((annonce) => (
                  <Card
                    key={annonce.ID_Annonce}
                    type="inner"
                    title={
                      annonce.membre && annonce.membre
                        ? `${annonce.membre.Nom} ${annonce.membre.Prenom}`
                        : ""
                    }
                    extra={<App/>}
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <div className="flex">
                      <div className="block">
                        <p>
                          Date: {format(new Date(annonce.date), "dd/MM/yyyy")}
                        </p>
                        <p>
                          Heure:{" "}
                          {format(
                            new Date("1970-01-01T" + annonce.heure),
                            "HH:mm"
                          )}
                        </p>
                        <div style={{ display: "flex", gap: "2px" }}>
                          <p>{annonce.position_depart}</p>
                          <img
                            src="/images/right_32px.png"
                            alt=""
                            width={25}
                            height={25}
                          />
                          <p>{annonce.position_arrive}</p>
                        </div>
                      </div>
                      <div className="box">
                        <label>Place</label>
                        <p>{annonce.place_recherche}</p>
                      </div>
                      <div className="box">
                        <label>Prix</label>
                        <p>{annonce.prix_par_place} Ar</p>
                      </div>
                      <button
                        className="reserve-inside"
                        onClick={() =>
                          reserver(annonce.ID_Annonce, annonce.ID_Membre)
                        }
                      >
                        <p>Reserver</p>
                        <img src="/images/checkmark_yes_64px.png" alt="logo" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {activeTab === "conducteurs" && (
            <div>
              <div className="cards-container2">
                {conducteurAnnonces.map((annonce) => (
                  <Card
                    key={annonce.ID_Annonce}
                    type="inner"
                    title={annonce.membre ? annonce.membre.Nom : ""}
                    extra={<App/>}
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <div className="flex">
                      <div className="block">
                        <p>
                          Date: {format(new Date(annonce.date), "dd/MM/yyyy")}
                        </p>
                        <p>
                          Heure:{" "}
                          {format(
                            new Date("1970-01-01T" + annonce.heure),
                            "HH:mm"
                          )}
                        </p>
                        <div style={{ display: "flex", gap: "2px" }}>
                          <p>{annonce.position_depart}</p>
                          <img
                            src="/images/right_32px.png"
                            alt=""
                            width={25}
                            height={25}
                          />
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
                      <button
                        className="reserve-inside"
                        onClick={() =>
                          reserver(annonce.ID_Annonce, annonce.ID_Membre)
                        }
                      >
                        <p>Reserver</p>
                        <img src="/images/checkmark_yes_64px.png" alt="logo" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Réserver une place"
        centered
        open={modal2Open}
        onOk={reserver2} // Appelez correctement la fonction
        onCancel={() => setModal2Open(false)}
      >
        <label htmlFor="Place_reserve">Nombre de places à réserver :</label>
        <input
          type="number"
          id="Place_reserve"
          className="input"
          value={Place_Reservees}
          onChange={(e) => setPlace_Reservees(Number(e.target.value))}
          min="1"
        />
      </Modal>
    </div>
  );
}
