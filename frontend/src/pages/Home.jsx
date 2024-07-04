/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/mesannonce.css";
import axiosClient from "../axiosClient";
import App from "../objets/spin";

export default function Home() {
  const [annonces, setAnnonces] = useState([]);
  const departRef = createRef();
  const arriveRef = createRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const position_depart = departRef.current.value;
    const position_arrive = arriveRef.current.value;
    
    if (position_depart && position_arrive) {
      navigate('../rechercher', { state: { position_depart, position_arrive } });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };


  const gotoride = () => {
    navigate("../annonce_form");
  };

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // Utilisez axiosClient pour effectuer les requêtes
        const response = await axiosClient.get("/getvody");
        setAnnonces(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <>
      <div className="body">
        <div className="search">
          <div className="card2">
            <div className="center">
              <form onSubmit={handleSubmit}>
                <h2 style={{ color: "#3a3c6c" }}>TROUVEZ</h2>
                <h1 style={{ fontWeight: "18vh", color: "#3a3c6c" }}>
                  UN COVOITURAGE
                </h1>
                <h2 style={{ fontSize: "18px", color: "#444444" }}>
                  Covoiturez sur tous vos types de trajets sans aucune
                  commission.
                </h2>
                <div className="mtsam">
                  <input
                    className="input"
                    id="depart"
                    ref={departRef}
                    type="text"
                    placeholder="Adresse de départ"
                    required
                  />
                  <input
                    className="input"
                    id="arrive"
                    ref={arriveRef}
                    type="text"
                    placeholder="Adresse d'arrivée"
                    required
                  />
                  <button id="lancer" type="submit">
                    <div className="bloblo">
                      Lancer ma recherche{" "}
                      <img
                        src="/images/search.png"
                        width={"12px"}
                        alt="search icon"
                      />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="fondgris">
            <div className="center">
              <h1 className="blanc" id="blanc1">
                Vous avez une voiture ?
              </h1>
              <h2 className="blanc">
                Faites des économies sur vos déplacements, publiez une annonce
                de covoiturage !
              </h2>
              <button id="lancer" onClick={gotoride}>
                Proposer des places{" "}
                <img src="/images/add.png" width={"12px"} alt="add icon" />
              </button>
            </div>
          </div>
          <div className="t3div">
            <div className="card3">
              <div className="top2">Derniers Covoiturages</div>
              <div className="content">
                {annonces.map((annonce, index) => (
                  <div className="horizontal-card" key={index}>
                    <div key={index} style={{ display: "flex", gap: "2px" }}>
                      <p style={{ marginLeft: "20px" }}>{annonce.membre_nom}</p>
                      <p style={{ marginLeft: "3px", marginRight: "30px" }}>
                        {annonce.membre_prenom}
                      </p>
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
                ))}
              </div>
            </div>
            {/* <div className="card3">
              <div className="top2">Statistiques</div>
              <div className="content">
                <div className="goto"></div>
              </div>
            </div> */}
            {/* <div className="card3">
              <div className="top2">Ridex sur votre smartphone</div>
              <div className="content">
                Pas d’application à installer, pas de mémoire prise sur votre
                téléphone. Un simple raccourci vers notre site à créer en 30
                secondes chrono !
                <br />
                <img
                  src="/images/illustration-responsive.png"
                  alt="responsive illustration"
                />
                </div>
              </div> */}
          </div>
        </div>
        <App/>
      </div>
    </>
  );
}
