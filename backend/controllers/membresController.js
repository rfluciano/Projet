const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const fs = require('fs');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("photo");

// Create main model
const Membres = db.membres;

// Fonction pour générer un token JWT
const generateToken = async (id) => {
  const token = jwt.sign({ id }, "votre_clé_secrète"); // Remplacez 'votre_clé_secrète' par votre propre clé secrète
  await Membres.update({ Token: token }, { where: { ID_Membre: id } }); // Stocker le token dans la base de données
  return token;
};

const login = async (req, res) => {
    try {
      const { Email, MotDePasse } = req.body;
      const membre = await Membres.findByCredentials(Email, MotDePasse);
  
      // Générer un token JWT pour le membre
      const token = await membre.generateToken();
  
      // Envoyer la réponse avec le membre et le token
      res.status(200).send({ membre, token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(401).send({ error: error.message });
    }
  };
  
  // Middleware pour gérer l'inscription (Sign-up)
  const signup = async (req, res) => {
    try {
        const { Nom, Prenom, Email, MotDePasse, TypeMembre, NumeroTelephone } = req.body;

        // Vérifier que tous les champs sont présents
        if (!Nom || !Prenom || !Email || !MotDePasse || !NumeroTelephone) {
            throw new Error("Tous les champs sont requis");
        }

        // Créer un nouveau membre
        const membre = await Membres.create({
            Nom,
            Prenom,
            Email,
            MotDePasse,
            TypeMembre,
            NumeroTelephone
        });

        // Générer un token JWT pour le nouveau membre
        const token = await membre.generateToken();

        // Envoyer la réponse avec le membre et le token
        res.status(201).send({ membre, token });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(400).send({ error: error.message });
    }
};

  

  const logout = async (req, res) => {
    try {
      // Clear the token stored in the database
      // Assuming you have a field named Token in your membres table
      const membre = req.user; // Assuming you have middleware to verify JWT and attach user to req.user
      await membre.update({ Token: null });
  
      // Respond with success message
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      // Handle error
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Fonction pour obtenir tous les membres
const getAllMembre = async (req, res) => {
  let membres = await Membres.findAll({});
  res.status(200).send(membres);
};

// Fonction pour obtenir un seul membre
const getOneMembre = async (req, res) => {
  let id = req.params.id;
  try {
    let membre = await Membres.findOne({ where: { ID_Membre: id } });
    res.status(200).send(membre);
  } catch (error) {
    console.error("Erreur lors de la récupération du membre :", error.message);
    res.status(500).json({ error: "Impossible de récupérer le membre" });
  }
};


// Fonction pour mettre à jour un membre
const updateMembre = async (req, res) => {
  let id = req.params.id;
  let membre = await Membres.update(req.body, { where: { ID_Membre: id } });
  res.status(200).send(membre);
};

// Fonction pour supprimer un membre
const deleteMembre = async (req, res) => {
  let id = req.params.id;
  await Membres.destroy({ where: { ID_Membre: id } });
  res.status(200).send("Membre supprimé avec succès");
};


const updateMembrePhoto = async (req, res) => {
  try {
    const membreId = req.params.id;
    const photoPath = req.file.path;

    // Find the membre and update the photo path
    const membre = await Membres.findByPk(membreId);
    if (!membre) {
      return res.status(404).json({ error: 'Membre not found' });
    }

    membre.photo = photoPath;
    await membre.save();

    res.status(200).json({ message: 'Photo updated successfully', membre });
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getMembrePhoto = async (req, res) => {
  try {
    const membreId = req.params.id;

    const membre = await Membres.findByPk(membreId);
    if (!membre || !membre.Photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photoPath = path.join(__dirname, '..', membre.Photo);

    // Check if the file exists
    if (!fs.existsSync(photoPath)) {
      return res.status(404).json({ error: 'Photo file not found' });
    }

    res.sendFile(photoPath);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  login,
  logout,
  signup,
  getAllMembre,
  getOneMembre,
  updateMembre,
  deleteMembre,
  updateMembrePhoto,
  getMembrePhoto
};
