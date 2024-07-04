/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import "../style/about.css";

export default function About() {
  return (
    <div className="card">
      <div className="about-page">
        <h1>À propos de Ridex</h1>

        <p>
          Ridex est une plateforme de covoiturage qui met en relation des conducteurs disposant de places libres avec des passagers recherchant un trajet. Notre mission est de rendre le covoiturage accessible à tous, afin de favoriser une mobilité plus durable, économique et conviviale.
        </p>

        <div className="sect-1">
          <h2>Pourquoi choisir Ridex ?</h2>

          <ul>
            <li>Une communauté dynamique et engagée</li>
            <li>Un service simple et efficace</li>
            <li>Des prix avantageux</li>
            <li>Un geste pour l'environnement</li>
            <li>Un mode de transport convivial</li>
          </ul>
        </div>

        <div className="sect-2">
          <h2>Comment fonctionne Ridex ?</h2>

          <ol>
            <li>Créez votre compte</li>
            <li>Proposez un trajet ou recherchez un covoiturage</li>
            <li>Contactez les conducteurs ou les passagers</li>
            <li>Payez votre cotisation (pour les passagers)</li>
            <li>Effectuez votre covoiturage</li>
          </ol>
        </div>

        <div className="sect-3">
          <h2>Ridex: plus qu'un simple moyen de transport</h2>

          <p>
            En plus de vous permettre de trouver un covoiturage, Ridex vous propose également de nombreux autres services :
          </p>

          <ul>
            <li>Un système d'évaluation</li>
            <li>Des conseils et astuces pour le covoiturage</li>
            <li>Un blog</li>
            <li>Un forum</li>
          </ul>
        </div>

        <div className="sect-4">
          <h2>Rejoignez la communauté Ridex et contribuez à un monde plus durable et solidaire !</h2>

          <p>
            Ridex: le covoiturage nouvelle génération !
          </p>
        </div>
      </div>
    </div>
  );
}
