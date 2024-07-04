/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import "../style/Footer.css"; // Import du fichier CSS contenant les styles

const Footer = () => {
  return (
    <div className="di">
      <footer className="footer footer-dark-gray">
        <div className="row">
        <div className="col-md-3">
              <h4>À propos</h4>
              <ul>
                <li>
                  <a href="#">Conditions générales d'utilisation</a>
                </li>
                <li>
                  <a href="#">Questions fréquentes</a>
                </li>
                <li>
                  <a href="#">Nous contacter</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Prime Covoiturage</h4>
              <ul>
                <li>
                  <a href="#">Plus d'infos</a>
                </li>
                <li>
                  <a href="#">Salle de presse</a>
                </li>
                <li>
                  <a href="#">Pourquoi gratuit ?</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Application mobile</h4>
              <ul>
                <li>
                  <a href="#">Nos références</a>
                </li>
                <li>
                  <a href="#">Ressources</a>
                </li>
                <li>
                  <a href="#">Faites-nous connaître</a>
                </li>
              </ul>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
