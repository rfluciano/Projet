const db = require("../models");
const Reservations = db.reservations;
const Annonces = db.annonces;
const Membres = db.membres;
const { Op } = require('sequelize'); // Importez Op pour les opérations de Sequelize
const { sequelize } = require('../models'); 

// Créer une réservation
// Créer une réservation
const createReservation = async (req, res) => {
    try {
        const {
            ID_Annonce,
            ID_Membre_Reservant,
            ID_Membre_Proprietaire,
            PlacesReservees,
            Statut
        } = req.body;

        // Validation des données
        if (!ID_Annonce || !ID_Membre_Reservant || !ID_Membre_Proprietaire || !PlacesReservees || !Statut) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }

        // Vérification que le membre réservant n'est pas le même que le membre propriétaire
        if (ID_Membre_Reservant === ID_Membre_Proprietaire) {
            return res.status(400).json({ error: 'Le membre réservant ne peut pas être le même que le membre propriétaire.' });
        }

        // Trouver l'annonce associée à la réservation
        const annonce = await Annonces.findByPk(ID_Annonce);
        if (!annonce) {
            return res.status(404).json({ error: 'Annonce non trouvée.' });
        }

        // Mettre à jour les places disponibles ou recherchées en fonction du rôle
        let updateFields = {};
        if (annonce.role === 'Conducteur') {
            updateFields = { place_disponible: sequelize.literal(`place_disponible - ${PlacesReservees}`) };
        } else if (annonce.role === 'Passager') {
            updateFields = { place_recherche: sequelize.literal(`place_recherche - ${PlacesReservees}`) };
        }

        // Création de la nouvelle réservation
        const nouvelleReservation = await Reservations.create({
            ID_Annonce,
            ID_Membre_Reservant,
            ID_Membre_Proprietaire,
            PlacesReservees,
            Statut
        });

        // Mettre à jour l'annonce parent
        await Annonces.update(updateFields, {
            where: { ID_Annonce },
        });

        // Envoi de la réponse avec le statut de réussite
        res.status(201).json(nouvelleReservation);
        req.io.emit("nvr");
        req.io.emit("nva");

    } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error.message);
        res.status(400).json({ error: error.message });
    }
};





// Obtenir toutes les réservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservations.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error.message);
        res.status(500).json({ error: "Impossible de récupérer les réservations" });
    }
};

// Obtenir une réservation par son ID
const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservations.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: "Réservation non trouvée" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        console.error("Erreur lors de la récupération de la réservation :", error.message);
        res.status(500).json({ error: "Impossible de récupérer la réservation" });
    }
};


// Obtenir toutes les réservations effectuées par un membre_reservant
const getReservationsByMembreReservant = async (req, res) => {
    const { ID_Membre_Reservant } = req.params; // Assurez-vous que ID_Membre_Reservant est passé dans les paramètres de la requête
    try {
        const reservations = await Reservations.findAll({
            where: { ID_membre_reservant: ID_Membre_Reservant },
            include: [Annonces],
            include: [Membres] // Inclure les détails de l'annonce associée si nécessaire
        });
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error.message);
        res.status(500).json({ error: "Impossible de récupérer les réservations" });
    }
};

const getReservationsByMembreProprietaire = async (req, res) => {
    const { ID_Membre_Proprietaire } = req.params;
    try {
      const reservations = await Reservations.findAll({
        where: { ID_Membre_Proprietaire },
        include: [
          {
            model: Annonces,
            as: 'annonce'
          },
          {
            model: Membres,
            as: 'Reservant'
          },
          {
            model: Membres,
            as: 'Proprietaire'
          }
        ]
      });
      res.status(200).json(reservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error.message);
      res.status(500).json({ error: "Impossible de récupérer les réservations" });
    }
  };
  


const getMyReservations = async (req, res) => {
    const { ID_Membre_Reservant } = req.params;

    try {
        const reservations = await Reservations.findAll({
            where: { ID_membre_reservant: ID_Membre_Reservant },
            include: [Annonces], // Inclure les détails de l'annonce associée si nécessaire
        });

        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error.message);
        res.status(500).json({ error: "Impossible de récupérer les réservations" });
    }
};



const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        // Trouver la réservation à supprimer
        const reservation = await Reservations.findByPk(id, {
            include: [{ model: Annonces, as: 'annonce' }] // Inclure l'annonce associée à la réservation
        });
        if (!reservation) {
            throw new Error("Réservation non trouvée");
        }

        let updateFields = {};
        if (reservation.annonce.role === 'Conducteur') {
            updateFields = { place_disponible: sequelize.literal(`place_disponible + ${reservation.PlacesReservees}`) };
        } else if (reservation.annonce.role === 'Passager') {
            updateFields = { place_recherche: sequelize.literal(`place_recherche + ${reservation.PlacesReservees}`) };
        }

        // Mettre à jour l'annonce parent
        await Annonces.update(updateFields, {
            where: { ID_Annonce: reservation.ID_Annonce }
        });

        // Supprimer la réservation
        await Reservations.destroy({
            where: { ID_Reservation: id }
        });

        // Émettre un événement pour notifier les clients
        req.io.emit("nvr");

        // Répondre avec un statut 204 (No Content)
        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error.message);
        res.status(500).json({ error: error.message });
    }
};




const accepterReservation = async (req, res) => {
    const { id } = req.params;
    try {
      // Mettre à jour le statut de la réservation en "Accepted"
      await Reservations.update({ Statut: "Accepted" }, {
        where: { ID_Reservation: id }
      });
      res.status(200).json({ message: "Réservation acceptée avec succès" });
      req.io.emit("nvr");
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la réservation :", error);
      res.status(500).json({ error: "Une erreur est survenue lors de l'acceptation de la réservation" });
    }
  };
  
  const refuserReservation = async (req, res) => {
    const { id } = req.params;
    try {
      // Mettre à jour le statut de la réservation en "Refused"
      await Reservations.update({ Statut: "Refused" }, {
        where: { ID_Reservation: id }
      });
      res.status(200).json({ message: "Réservation refusée avec succès" });
      req.io.emit("nvr");
    } catch (error) {
      console.error("Erreur lors du refus de la réservation :", error);
      res.status(500).json({ error: "Une erreur est survenue lors du refus de la réservation" });
    }
  };




module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    deleteReservation,
    getReservationsByMembreReservant,
    getMyReservations,
    getReservationsByMembreProprietaire,
    accepterReservation,
    refuserReservation
};
