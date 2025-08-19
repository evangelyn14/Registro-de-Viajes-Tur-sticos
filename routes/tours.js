const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const { verificarToken } = require('../seguridad/auth');

router.get("/", tourController.getTours);
router.get("/:id", tourController.getTourById);
router.post("/", tourController.createTour);
router.put("/:id", tourController.updateTour);
router.delete("/:id", tourController.deleteTour);

module.exports = router;