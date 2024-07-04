/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "antd";
import "../style/card.css";

const App = () => (
//   <Card title="Card title">
//       </Card>
    <div style={{ display: "block", gap: "200px" }}>
      <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">Voir plus</a>}
        style={{ marginBottom: "20px" }} // Ajout de la marge inférieure
      >
        <div className="flex">
          <div className="block">
            <p>$date&heure</p>

            <p>$adresseDepart</p>
            <p>$adresseArrivee</p>
          </div>
          <div className="box">
            <label>Place</label>
            <p>$placeDisponible</p>
          </div>
          <div className="box">
            <label>Prix</label>
            <p>$prixParPlace</p>
          </div>
          <button className="reserve">
            <p>Reserver</p>
            <img src="/images/checkmark_yes_64px.png" alt="logo" />
          </button>
        </div>
      </Card>

      {/* <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">Voir plus</a>}
        style={{ marginBottom: "20px" }} // Ajout de la marge inférieure
      >
        <div className="flex">
          <div className="block">
            <p>25-10-2004</p>
            <p>Tamatave</p>
          </div>
          <div className="box">
            <label>Place</label>
            <p>1</p>
          </div>
          <div className="box">
            <label>Prix</label>
            <p>10.000Ar</p>
          </div>
          <button className="reserve">
            <p>Reserver</p>
            <img src="/images/checkmark_yes_64px.png" alt="logo" />
          </button>
        </div>
      </Card>

      <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">Voir plus</a>}
        style={{ marginBottom: "20px" }} // Ajout de la marge inférieure
      >
        <div className="flex">
          <div className="block">
            <p>25-10-2004</p>
            <p>Tamatave</p>
          </div>
          <div className="box">
            <label>Place</label>
            <p>1</p>
          </div>
          <div className="box">
            <label>Prix</label>
            <p>10.000Ar</p>
          </div>
          <button className="reserve">
            <p>Reserver</p>
            <img src="/images/checkmark_yes_64px.png" alt="logo" />
          </button>
        </div>
      </Card>

      <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">Voir plus</a>}
        style={{ marginBottom: "20px" }} // Ajout de la marge inférieure
      >
        <div className="flex">
          <div className="block">
            <p>25-10-2004</p>
            <p>Tamatave</p>
          </div>
          <div className="box">
            <label>Place</label>
            <p>1</p>
          </div>
          <div className="box">
            <label>Prix</label>
            <p>10.000Ar</p>
          </div>
          <button className="reserve">
            <p>Reserver</p>
            <img src="/images/checkmark_yes_64px.png" alt="logo" />
          </button>
        </div>
      </Card>

      <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">Voir plus</a>}
        style={{ marginBottom: "20px" }} // Ajout de la marge inférieure
      >
        <div className="flex">
          <div className="block">
            <p>25-10-2004</p>
            <p>Tamatave</p>
          </div>
          <div className="box">
            <label>Place</label>
            <p>1</p>
          </div>
          <div className="box">
            <label>Prix</label>
            <p>10.000Ar</p>
          </div>
          <button className="reserve">
            <p>Reserver</p>
            <img src="/images/checkmark_yes_64px.png" alt="logo" />
          </button>
        </div>
      </Card> */}
    </div>

);

export default App;
