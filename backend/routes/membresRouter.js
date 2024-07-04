const express = require("express");
const membresController = require("../controllers/membresController");
const verifyToken = require("../middleware/verifyToken");
const multer = require('multer');
const path = require('path');
const { updateMembrePhoto } = require('../controllers/membresController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
  }
});


const upload = multer({ storage: storage });

router.put('/Update_membre_photo/:id', upload.single('photo'), updateMembrePhoto);
router.get('/Get_membre_photo/:id', membresController.getMembrePhoto);
router.post("/login", membresController.login);
router.post("/logout", verifyToken, membresController.logout);
router.post("/signup", membresController.signup);
router.get("/Get_membres", membresController.getAllMembre);
router.get("/Search_membres/:id", membresController.getOneMembre);
router.put("/Update_membres/:id", membresController.updateMembre);
router.delete("/Delete_membres/:id", membresController.deleteMembre);
// router.get("/getid/:token", membresController.findMemberIdFromToken);
module.exports = router;
