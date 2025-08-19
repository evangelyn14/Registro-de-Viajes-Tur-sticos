const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
  usuario:          { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  tour:             { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  fechaReserva:     { type: Date, default: Date.now },
  cantidadPersonas: { type: Number, required: true },
  estado:           { type: String, enum: ["pendiente", "confirmada", "cancelada"], default: "pendiente" }
}, {
  timestamps: true
});

module.exports = model('Reserva', reservaSchema);