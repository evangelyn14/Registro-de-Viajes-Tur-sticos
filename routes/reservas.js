const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { verificarToken } = require('../seguridad/auth');

router.get("/", verificarToken, reservaController.getReservas);
router.get("/:id", verificarToken, reservaController.getReservaById);
router.post("/", verificarToken, reservaController.createReserva);
router.put("/:id", verificarToken, reservaController.updateReserva);
router.delete("/:id", verificarToken, reservaController.deleteReserva);

module.exports = router;
