const express = require("express");
const reservationsController = require("../controllers/reservationsController");

const router = express.Router();

router.post("/reserver", reservationsController.createReservation);
router.get("/mesreservations", reservationsController.getAllReservations);
router.get("/reservation/:id", reservationsController.getReservationById);
router.delete(
  "/reservation_delete/:id",
  reservationsController.deleteReservation
);
router.get(
  "/getmyreservations/:ID_Membre_Reservant",
  reservationsController.getMyReservations
);
router.get(
  "/getmyalertes/:ID_Membre_Proprietaire",
  reservationsController.getReservationsByMembreProprietaire
);
router.put(
  "/reservation_accept/:id",
  reservationsController.accepterReservation
);
router.put(
  "/reservation_refuse/:id",
  reservationsController.refuserReservation
);

module.exports = router;
