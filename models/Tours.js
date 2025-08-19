const { Schema, model } = require('mongoose');

const tourSchema = new Schema({
  nombre:       { type: String, required: true },
  descripcion:  { type: String },
  precio:       { type: Number, required: true },
  duracionHoras:{ type: Number },
  fecha:        { type: Date, required: true },
}, {
  timestamps: true
});

module.exports = model('Tours', tourSchema);
