const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const { verificarToken } = require('../seguridad/auth');

router.get("/", tourController.getTours);
router.get("/:id", tourController.getTourById);
router.post("/", verificarToken, tourController.createTour);
router.put("/:id", verificarToken, tourController.updateTour);
router.delete("/:id", verificarToken, tourController.deleteTour);

module.exports = router;