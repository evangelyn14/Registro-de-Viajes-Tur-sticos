const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const Tours = require('../models/Tours');

// GET todas las reservas del usuario autenticado
exports.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.usuarioId })
      .populate("usuario", "nombre email") // trae datos básicos del usuario
      .populate("tour", "nombre precio");  // trae datos básicos del tour
    res.json(reservas);
  } catch (err) {
    console.error('Error al obtener reservas:', err);
    res.status(500).json({ error: 'Error del servidor'});
  }
};

// GET una reserva por ID
exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate("usuario", "nombre email")
      .populate("tour", "nombre precio");
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor'});
  }
};

// POST crear reserva
exports.createReserva = async (req, res) => {
  try {
    // Agregar el usuario autenticado a la reserva
    const reservaData = {
      ...req.body,
      usuario: req.usuarioId // Viene del middleware de autenticación
    };
    
    const reserva = new Reserva(reservaData);
    const nuevaReserva = await reserva.save();
    
    // Poblar la reserva con los datos del tour y usuario para la respuesta
    await nuevaReserva.populate('usuario', 'nombre email');
    await nuevaReserva.populate('tour', 'nombre precio');
    
    res.status(201).json(nuevaReserva);
  } catch (err) {
    console.error('Error al crear reserva:', err);
    res.status(400).json({ error: 'Error al crear reserva', details: err.message });
  }
};

// PUT actualizar reserva
exports.updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(reserva);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar tour' });
  }
};

// DELETE eliminar reserva
exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
