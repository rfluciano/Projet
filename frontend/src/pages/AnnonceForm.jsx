/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import "../style/annonce_form.css";
import { toast } from "react-toastify";

export default function AnnonceForm() {
  const [activeTab, setActiveTab] = useState("profile");
  const { membre_connected } = useStateContext();
  
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [prixParPlace, setPrixParPlace] = useState("");
  const [role, setRole] = useState("");
  const [positionArrive, setPositionArrive] = useState("");
  const [positionDepart, setPositionDepart] = useState("");
  const [placeDisponible, setPlaceDisponible] = useState("");
  const [placeRecherche, setPlaceRecherche] = useState("");
  const [errors, setErrors] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const ID_Membre = membre_connected.ID_Membre;
    const payload = {
      ID_Membre,
      position_depart: positionDepart,
      position_arrive: positionArrive,
      date: date,
      heure: heure,
      role: role,
      place_recherche: placeRecherche,
      place_disponible: placeDisponible,
      prix_par_place: prixParPlace,
    };
    
    console.log(membre_connected.ID_Membre);

    try {
      const response = await axiosClient.post("/Add_annonces", payload);
      toast.success("Annonce créée avec succès.", {
        position: "bottom-right",
        render: ({ closeToast }) => (
          <div>
            <span>Annonce créée avec succès. </span>
            <button onClick={() => { 
              closeToast(); // Ferme le toast avant de naviguer
              navigate("/mesannonces"); // Navigate vers la page "mesannonces"
            }}>
              Voir Mes Annonces
            </button>
          </div>
        ),
      });
      
      console.log("Annonce créée:", response.data);
      setDate("");
      setHeure("");
      setPlaceDisponible("");
      setPlaceRecherche("");
      setPositionArrive("");
      setPositionDepart("");
      setPrixParPlace("");
      setRole("");
      navigate("../annonce");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors);
        console.log(err.response);
      } else {
        toast.error("Erreur inattendue lors de la création de la réservation.", {
          position: "bottom-right",
        });
        console.error("Erreur lors de la création de l'annonce:", err);
      }
    }
  };

  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("../dashboard");
  };

  const handleNext = (event, nextTab) => {
    event.preventDefault();
    setActiveTab(nextTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <form onSubmit={(e) => handleNext(e, "reservations")}>
              <label htmlFor="date">Date de départ:</label>
              <input
                className="input"
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <label htmlFor="heure">Heure de départ:</label>
              <input
                className="input"
                type="time"
                id="heure"
                value={heure}
                onChange={(e) => setHeure(e.target.value)}
                required
              />
              <button type="submit" className="next-button">
                Suivant
              </button>
            </form>
          </div>
        );
      case "reservations":
        return (
          <div>
            <form onSubmit={(e) => handleNext(e, "announcements")}>
              <label htmlFor="position_depart">Adresse de départ:</label>
              <input
                className="input"
                type="text"
                id="position_depart"
                value={positionDepart}
                onChange={(e) => setPositionDepart(e.target.value)}
                required
              />
              <label htmlFor="position_arrive">Destination:</label>
              <input
                className="input"
                type="text"
                id="position_arrive"
                value={positionArrive}
                onChange={(e) => setPositionArrive(e.target.value)}
                required
              />
              <button type="submit" className="next-button">
                Suivant
              </button>
            </form>
          </div>
        );
      case "announcements":
        return (
          <div>
            <form onSubmit={(e) => handleNext(e, "history")}>
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
              <button type="submit" className="next-button">
                Suivant
              </button>
            </form>
          </div>
        );
      case "history":
        return (
          <div>
            <form onSubmit={onSubmit}>
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
              <button id="lancer" type="submit">
                <div className="bloblo" height={"16px"}>
                  Publier
                </div>
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="content10">
      <div className="cardinal">
        <div className="toptop">
          <button className="retour" onClick={gotoDashboard}>
            <img src="/images/left.png" width={"16px"} alt="retour" />
            Retour
          </button>
          Créer une annonce
        </div>
        <div className="izy">
          <div className="tab-container">
            <div className="tab-buttons">
              <button
                disabled
                className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <img src="/images/timetable.png" alt="" width={"20px"} />
                Date et Heure
              </button>
              <button
                disabled
                className={`tab-button ${activeTab === "reservations" ? "active" : ""}`}
                onClick={() => setActiveTab("reservations")}
              >
                <img src="/images/Location.png" alt="" width={"20px"} />
                Départ & Destination
              </button>
              <button
                disabled
                className={`tab-button ${activeTab === "announcements" ? "active" : ""}`}
                onClick={() => setActiveTab("announcements")}
              >
                <img src="/images/taxi_pay.png" alt="" width={"20px"} />
                Places & Prix
              </button>
              <button
                disabled
                className={`tab-button ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <img src="/images/share_document.png" alt="" width={"20px"} />
                Publier
              </button>
            </div>
            <div className="tab-content">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
