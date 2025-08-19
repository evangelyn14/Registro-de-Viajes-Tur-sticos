const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const Tours = require('../models/Tours');


// GET todos los tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor'});
  }
};

// GET un tour por ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour no encontrado" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// POST crear tour
exports.createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    const nuevoTour = await tour.save();
    res.status(201).json(nuevoTour);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear tour' });
  }
};

// PUT actualizar tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: "Tour no encontrado" });
    res.json(tour);
  } catch (err) {
    res.status(400).json({error: 'Error al actualizar tour' });
  }
};

// DELETE eliminar tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour no encontrado" });
    res.json({ message: "Tour eliminado correctamente" });
  } catch (err) {
    res.status(500).json({error: 'Error del servidor' });
  }
};
