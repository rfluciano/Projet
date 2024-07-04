const express = require("express");
const annoncesController = require("../controllers/annoncesController");

const router = express.Router();

router.post("/Add_annonces", annoncesController.createAnnonce);
router.get("/Get_annonces", annoncesController.getAllAnnonces);
router.get("/Search_annonces", annoncesController.searchAnnonces);
router.get("/Search_annonces/:id", annoncesController.getAnnonceById);
router.get("/get_passagers", annoncesController.getAllPassagerAnnonces);
router.get("/get_conducteurs", annoncesController.getAllConducteurAnnonces);
router.put("/Update_annonces/:id", annoncesController.updateAnnonce);
router.delete("/Delete_annonces/:id", annoncesController.deleteAnnonce);
router.get("/getmyannonce/:userId", annoncesController.getAnnoncesByUserId);
router.get("/getvody", annoncesController.getPositionsWithMemberNames);

// Nouvelle route pour la recherche par positions
router.get("/searchByPositions", annoncesController.searchByPositions);

module.exports = router;
