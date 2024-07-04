const db = require("../models");
const Annonces = db.annonces;
const Membres = db.membres;
const { Op } = require('sequelize');


const searchAnnonces = async (req, res) => {
  try {
    // Récupérer les critères de recherche depuis le corps de la requête
    const { 
      position_depart, 
      position_arrive, 
      date_debut, 
      date_fin, 
      heure, 
      role, 
      place_recherche, 
      place_disponible, 
      prix_par_place 
    } = req.body;

    // Initialiser le critère de recherche
    const whereClause = {};

    // Ajouter les critères de recherche qui ont une valeur définie
    if (position_depart) whereClause.position_depart = position_depart;
    if (position_arrive) whereClause.position_arrive = position_arrive;
    if (heure) whereClause.heure = heure;
    if (role) whereClause.role = role;
    if (place_recherche) whereClause.place_recherche = place_recherche;
    if (place_disponible) whereClause.place_disponible = place_disponible;
    if (prix_par_place) whereClause.prix_par_place = prix_par_place;

    // Ajouter le critère de recherche pour l'intervalle de dates s'il est défini
    if (date_debut && date_fin) {
      whereClause.date = {
        [Op.between]: [date_debut, date_fin]
      };
    }

    // Effectuer la recherche dans la base de données en fonction des critères
    const annonces = await Annonces.findAll({
      where: whereClause,
      include: {
        model: Membres,
        attributes: ["ID_Membre", "Nom", "Prenom", "Email"],
      },
    });

    // Retourner les annonces correspondantes
    res.status(200).json({ annonces });
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de la recherche des annonces:", error);
    res.status(500).json({ error: error.message });
  }
};


const createAnnonce = async (req, res) => {
  try {
    const {
      ID_Membre,
      position_depart,
      position_arrive,
      date,
      heure,
      role,
      place_recherche,
      place_disponible,
      prix_par_place,
    } = req.body;

    // Validation des données
    if (!ID_Membre) {
      return res.status(400).json({ error: "ID_Membre est requis." });
    }
    if (!position_depart || !position_arrive || !date || !heure || !role) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Création de la nouvelle annonce
    const nouvelleAnnonce = await Annonces.create({
      ID_Membre,
      position_depart,
      position_arrive,
      date,
      heure,
      role,
      place_recherche,
      place_disponible,
      prix_par_place,
    });

    // Envoi de la réponse avec le statut de réussite
    res.status(201).json(nouvelleAnnonce);

    // Emission de l'événement via Socket.io
    req.io.emit("nva", nouvelleAnnonce);
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error.message);
    res.status(400).json({ error: error.message });
  }
  req.io.emit("n-v-a");
};

const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonces.findAll();
    res.status(200).json(annonces);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des annonces :",
      error.message
    );
    res.status(500).json({ error: "Impossible de récupérer les annonces" });
  }
};

const getAnnonceById = async (req, res) => {
  const { id } = req.params;
  try {
    const annonce = await Annonces.findByPk(id);
    if (!annonce) {
      return res.status(404).json({ error: "Annonce non trouvée" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'annonce :",
      error.message
    );
    res.status(500).json({ error: "Impossible de récupérer l'annonce" });
  }
};

const updateAnnonce = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Annonces.update(req.body, {
      where: { ID_Annonce: id },
    });
    if (updated) {
      const updatedAnnonce = await Annonces.findByPk(id);
      req.io.emit("nva");
      return res.status(200).json(updatedAnnonce);
    }
    return res.status(404).json({ error: "Annonce non trouvée" });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'annonce :",
      error.message
    );
    res
      .status(500)
      .json({
        error: "Une erreur est survenue lors de la mise à jour de l'annonce.",
      });
  }
};

const deleteAnnonce = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Annonces.destroy({
      where: { ID_annonce: id },
    });
    if (deleted) {
      req.io.emit("nva");
      return res.status(204).send();
    }
    throw new Error("Annonce non trouvée");
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'annonce :",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
};

const getAllConducteurAnnonces = async (req, res) => {
  try {
    const conducteurAnnonces = await Annonces.findAll({
      where: {
        role: "Conducteur",
      },
      include: {
        model: Membres,
        attributes: ["ID_Membre", "Nom", "Prenom", "Email"],
      },
    });

    res.status(200).json(conducteurAnnonces);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des annonces conducteur :",
      error.message
    );
    res
      .status(500)
      .json({ error: "Impossible de récupérer les annonces conducteur" });
  }
};

const getAllPassagerAnnonces = async (req, res) => {
  try {
    const passagerAnnonces = await Annonces.findAll({
      where: {
        role: "Passager",
      },
      include: {
        model: Membres,
        attributes: ["ID_Membre", "Nom", "Prenom", "Email"],
      },
    });
    res.status(200).json(passagerAnnonces);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des annonces passager :",
      error.message
    );
    res
      .status(500)
      .json({ error: "Impossible de récupérer les annonces passager" });
  }
};

const getAnnoncesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const annonces = await Annonces.findAll({
      where: {
        ID_Membre: userId,
      },
      include: {
        model: Membres,
        attributes: ["ID_Membre", "Nom", "Prenom", "Email"],
      },
    });
    res.status(200).json(annonces);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des annonces de l'utilisateur :",
      error.message
    );
    res
      .status(500)
      .json({ error: "Impossible de récupérer les annonces de l'utilisateur" });
  }
};

const getPositionsWithMemberNames = async (req, res) => {
  try {
    const annonces = await Annonces.findAll({
      attributes: ["position_depart", "position_arrive", "createdAt"],
      include: {
        model: Membres,
        attributes: ["Nom", "Prenom"],
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    const result = annonces.map((annonce) => ({
      position_depart: annonce.position_depart,
      position_arrive: annonce.position_arrive,
      membre_nom: annonce.membre.Nom,
      membre_prenom: annonce.membre.Prenom,
      createdAt: annonce.createdAt,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des positions et noms des membres :",
      error.message
    );
    res.status(500).json({ error: "Impossible de récupérer les données" });
  }
};

const searchByPositions = async (req, res) => {
  try {
    const { position_depart, position_arrive } = req.body;

    // // Validation des données
    // if (!position_depart || !position_arrive) {
    //   return res.status(400).json({ error: 'Les champs position_depart et position_arrive sont requis.' });
    // }

    // Effectuer la recherche dans la base de données en fonction des critères
    const annonces = await Annonces.findAll({
      where: {
        position_depart,
        position_arrive
      }
    });

    // Retourner les annonces correspondantes
    res.status(200).json({ annonces });
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de la recherche des annonces:", error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createAnnonce,
  getAllConducteurAnnonces,
  getAllPassagerAnnonces,
  getAllAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
  getAnnoncesByUserId,
  getPositionsWithMemberNames,
  searchAnnonces,
  searchByPositions
};
