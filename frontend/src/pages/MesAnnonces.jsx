/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Card } from "antd";
import "../style/mesannonce.css";
import App from "../objets/popConfirm";
import { Button, Modal, Popconfirm } from "antd";

export default function MesAnnonces() {
  const [mesAnnonces, setMesAnnonces] = useState([]);
  const navigate = useNavigate();
  const { membre_connected } = useStateContext();

  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [prixParPlace, setPrixParPlace] = useState("");
  const [role, setRole] = useState("");
  const [positionArrive, setPositionArrive] = useState("");
  const [positionDepart, setPositionDepart] = useState("");
  const [placeDisponible, setPlaceDisponible] = useState("");
  const [placeRecherche, setPlaceRecherche] = useState("");
  const [IDAnnonce, setIDAnnonce] = useState("");
  const [errors, setErrors] = useState(null);
  const ID_Membre = membre_connected.ID_Membre;

  const fetchMesAnnonces = async () => {
    try {
      const response = await axiosClient.get(`/getmyannonce/${ID_Membre}`);
      setMesAnnonces(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des annonces passagers :",
        error
      );
    }
  };

  useEffect(() => {
    fetchMesAnnonces();

    // Écoute des événements du socket
    socket.on("nva", (data) => {
      console.log("Data reçue via socket:", data);
      fetchMesAnnonces();
    });

    // Cleanup on component unmount
    return () => {
      socket.off("nva");
      socket.off("update");
    };
  }, [navigate]);

  const gotoDashboard = () => {
    navigate("../dashboard");
  };
  const get_annonce_by_id = async (id) => {
    try {
      setModal2Open(true);
      const response = await axiosClient.get(`/Search_annonces/${id}`);
      const annonceData = response.data;

      // Convertir la chaîne de date au format requis
      const dateFormatted = format(new Date(annonceData.date), "yyyy-MM-dd");
      setIDAnnonce(annonceData.ID_Annonce);
      setDate(dateFormatted);
      setHeure(annonceData.heure);
      setPrixParPlace(annonceData.prix_par_place);
      setRole(annonceData.role);
      setPositionArrive(annonceData.position_arrive);
      setPositionDepart(annonceData.position_depart);
      setPlaceDisponible(annonceData.place_disponible);
      setPlaceRecherche(annonceData.place_recherche);
      return annonceData;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'annonce par ID :",
        error
      );
      return null;
    }
  };

  const supprimer = async (id) => {
    try {
      await axiosClient.delete(`/Delete_annonces/${id}`);
      console.log("Annonce supprimée avec succès");
      fetchMesAnnonces(); // Mise à jour des annonces après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  const updateAnnonce = async (id, payload) => {
    try {
      const response = await axiosClient.put(`/Update_annonces/${id}`, payload);
      console.log("Annonce mise à jour:", response.data);
      return response.data; // Retourner les données de l'annonce mise à jour si nécessaire
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
      throw error; // Gérer l'erreur dans le composant appelant
    }
  };

  const onSubmit = async (id) => {
    const payload = {
      position_depart: positionDepart,
      position_arrive: positionArrive,
      date: date,
      heure: heure,
      role: role,
      place_recherche: placeRecherche,
      place_disponible: placeDisponible,
      prix_par_place: prixParPlace,
    };

    try {
      await updateAnnonce(id, payload);
      setModal2Open(false);
      // Mise à jour réussie, effectuez les actions nécessaires (par exemple, redirection)
      setDate("");
      setHeure("");
      setPlaceDisponible("");
      setPlaceRecherche("");
      setPositionArrive("");
      setPositionDepart("");
      setPrixParPlace("");
      setRole("");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors);
        console.log(err.response);
      } else {
        console.error("Erreur lors de la mise à jour de l'annonce:", err);
      }
    }
  };

  const [modal2Open, setModal2Open] = useState(false);

  return (
    <div className="content21">
      <div className="bobota">
        <div className="toptop">
          <button className="retour" onClick={gotoDashboard}>
            <img src="/images/left.png" width={"16px"} alt="retour" />
            Retour
          </button>
          Mes Annonces
        </div>
        <div className="tab-container3">
          <div className="cards-container3">
            {mesAnnonces.length === 0 ? (
              <div className="nodata">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "px",
                  fontSize: "20px",
                  color: "var(--darkblue)",
                }}
              >
                Vous n'avez posté aucune annonce pour le moment
              </p>
              <img src="/images/no_data.jpg" alt="" width={"600vh"} />
            </div>
            ) : (
              mesAnnonces.map((annonce) => (
                <Card
                  key={annonce.ID_Annonce}
                  type="inner"
                  title={"Annonce N°: "+annonce.ID_Annonce}
                  extra={<a href="#">Voir plus</a>}
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <div className="flex">
                    <div className="block">
                      <p>Date: {format(new Date(annonce.date), "dd/MM/yyyy")}</p>
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
                      <p>{annonce.place_disponible + annonce.place_recherche}</p>
                    </div>
                    <div className="box">
                      <label>Prix / Place</label>
                      <p>{annonce.prix_par_place} Ar</p>
                    </div>
                    <div className="reserve">
                      <button
                        // className="reserve-inside"
                        id="modifier"
                        onClick={() => get_annonce_by_id(annonce.ID_Annonce)}
                      >
                        <p>Modifier</p>
                        <img
                          src="/images/checkmark_yes_64px.png"
                          alt="logo"
                        />
                      </button>
                      <br />
                      <Popconfirm
                        placement="topRight"
                        title={"Suppression"}
                        description={
                          "Etes-vous sur de vouloir supprimer cette annonce ?"
                        }
                        okText="Oui"
                        cancelText="Non"
                        onConfirm={() => supprimer(annonce.ID_Annonce)}
                      >
                        <button
                          // className="reserve-inside"
                          id="supprimer"
                        >
                          <p>Supprimer</p>
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
      <Modal
        title="Modifier l'annonce"
        centered
        open={modal2Open}
        onOk={() => onSubmit(IDAnnonce)}
        onCancel={() => setModal2Open(false)}
      >
        <form>
          <label htmlFor="date">Date de départ:</label>
          <input
            className="input"
            type="date"
            id="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="heure">Heure de départ:</label>
          <input
            className="input"
            type="time"
            id="heure"
            value={heure}
            required
            onChange={(e) => setHeure(e.target.value)}
          />
          <label htmlFor="position_depart">Adresse de départ:</label>
          <input
            className="input"
            type="text"
            id="position_depart"
            value={positionDepart}
            required
            onChange={(e) => setPositionDepart(e.target.value)}
          />
          <label htmlFor="position_arrive">Destination:</label>
          <input
            className="input"
            type="text"
            id="position_arrive"
            value={positionArrive}
            required
            onChange={(e) => setPositionArrive(e.target.value)}
          />
          <label>Votre rôle:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="passager"
                name="role"
                value="Passager"
                checked={role === "Passager"}
                required
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="passager">Passager</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="conducteur"
                name="role"
                value="Conducteur"
                checked={role === "Conducteur"}
                required
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="conducteur">Conducteur</label>
            </div>
          </div>
          {role === "Conducteur" && (
            <>
              <label htmlFor="place_disponible">Places disponibles:</label>
              <input
                className="input"
                type="number"
                id="place_disponible"
                value={placeDisponible}
                onChange={(e) => setPlaceDisponible(e.target.value)}
                required
              />
            </>
          )}
          {role === "Passager" && (
            <>
              <label htmlFor="place_recherche">Places recherchées:</label>
              <input
                className="input"
                type="number"
                id="place_recherche"
                value={placeRecherche}
                onChange={(e) => setPlaceRecherche(e.target.value)}
                required
              />
            </>
          )}
          <label htmlFor="prix_par_place">Prix par place (Ar):</label>
          <input
            className="input"
            type="number"
            id="prix_par_place"
            value={prixParPlace}
            onChange={(e) => setPrixParPlace(e.target.value)}
            required
          />
          {/* <button id="lancer" type="submit">
                <div className="bloblo" height={"16px"}>
                  Publier
                </div>
              </button> */}
        </form>
      </Modal>
    </div>
  );
}
