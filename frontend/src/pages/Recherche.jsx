/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import "../style/recherche.css";
import App from "../objets/drawer2";
// import App from "../objets/drawer";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Annonce from "./Annonce";
import socket from "../socket";

const Recherche = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { membre_connected } = useStateContext();
  const [annonce, setAnnonces] = useState([]);
  const [positionDepart, setPositionDepart] = useState("");
  const [positionArrive, setPositionArrive] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heure, setHeure] = useState("");
  const [role, setRole] = useState("");
  const [placeRecherche, setPlaceRecherche] = useState("");
  const [placeDisponible, setPlaceDisponible] = useState("");
  const [prixParPlace, setPrixParPlace] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [passagerAnnonces, setPassagerAnnonces] = useState([]);
  const [conducteurAnnonces, setConducteurAnnonces] = useState([]);
  const [IdAnnonce, setIdAnnonce] = useState([]);
  const [IdMembre2, setIdMembre2] = useState([]);
  const [Place_Reservees, setPlace_Reservees] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    socket.on("nva", (data) => {
      console.log("Data reçue via socket:", data);
      fetchrecherche(); // Actualiser les annonces
    });
    const { position_depart, position_arrive } = location.state || {};
    if (position_depart && position_arrive) {
      setPositionDepart(position_depart);
      setPositionArrive(position_arrive);
      fetchrecherche(position_depart, position_arrive);
    } else {
      fetchrecherche();
    }
  }, [location.state]);

  const fetchrecherche = async () => {
    const ID_Membre = membre_connected.ID_Membre;
    const payload = {
      ID_Membre,
      position_depart: positionDepart,
      position_arrive: positionArrive,
      date_debut: dateDebut,
      date_fin: dateFin,
      heure: heure,
      role: role,
      place_recherche: placeRecherche,
      place_disponible: placeDisponible,
      prix_par_place: prixParPlace,
    };

    try {
      const response = await axiosClient.get("/Search_Annonces", {
        payload,
      });
      console.log("Annonces trouvées:", response.data);
      setAnnonces(response.data.annonces);
      console.log(annonce);
    } catch (err) {
      console.error("Erreur lors de la recherche des annonces:", err);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetchrecherche();
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
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error("Erreur lors de la création de la réservation.", {
          position: "bottom-right",
        });
        console.error(
          "Erreur lors de la création de la réservation:",
          err.response.data
        );
      } else {
        toast.error(
          "Erreur inattendue lors de la création de la réservation.",
          {
            position: "bottom-right",
          }
        );
        console.error(
          "Erreur inattendue lors de la création de la réservation:",
          err
        );
        // Gérer les erreurs inattendues ici
      }
    }
  };

  return (
    <div className="content30">
        
      <div className="tab-container2">
        <div className="toptop">
        <div className="retour">
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          Nouvelle recherche
        </Button>
          </div>
        Les resultats de votre recherche</div>
        <div className="tab-container">
          <div>
            <div className="cards-container3">
              {annonce.map((annonce) => (
                <Card
                  key={annonce.ID_Annonce}
                  type="inner"
                  title={
                    annonce.membre
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
                      <p>
                        {annonce.place_disponible + annonce.place_recherche}
                      </p>
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
        </div>
      </div>
      <Drawer
        title="Recherche d'annonce"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={onClose} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        <form onSubmit={onSubmit}>
          <Row gutter={16}>
            <div className="flex">
              <label>
                Position de départ:
                <input
                  required
                  className="input"
                  type="text"
                  value={positionDepart}
                  onChange={(e) => setPositionDepart(e.target.value)}
                />
              </label>
              <label>
                Position d'arrivée:
                <input
                  required
                  className="input"
                  type="text"
                  value={positionArrive}
                  onChange={(e) => setPositionArrive(e.target.value)}
                />
              </label>
            </div>
          </Row>
          <Row gutter={16}>
            <div className="flex">
              <label>
                Date de début:
                <input
                  required
                  className="input"
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                />
              </label>
              <label>
                Date de fin:
                <input
                  required
                  className="input"
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
              </label>
            </div>
          </Row>
          <Row gutter={16}>
            <label>Rôle recherché : </label>
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
          </Row>
          <Row gutter={16}>
            <div className="flex">
              {role === "Conducteur" && (
                <>
                  <label htmlFor="place_disponible">
                    Places recherchées:
                    <input
                      className="input"
                      type="number"
                      id="place_disponible"
                      value={placeDisponible}
                      onChange={(e) => setPlaceDisponible(e.target.value)}
                      required
                    />
                  </label>
                </>
              )}
              {role === "Passager" && (
                <>
                  <label htmlFor="place_recherche">
                    Places recherchées:
                    <input
                      className="input"
                      type="number"
                      id="place_recherche"
                      value={placeRecherche}
                      onChange={(e) => setPlaceRecherche(e.target.value)}
                      required
                    />
                  </label>
                </>
              )}
              <label htmlFor="prix_par_place">
                Prix par place (Ar):
                <input
                  className="input"
                  type="number"
                  id="prix_par_place"
                  value={prixParPlace}
                  onChange={(e) => setPrixParPlace(e.target.value)}
                  required
                />
              </label>
            </div>
          </Row>
        </form>
        <button id="lancer" type="submit" onClick={onSubmit}>
          Rechercher
        </button>
      </Drawer>
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
};

export default Recherche;
