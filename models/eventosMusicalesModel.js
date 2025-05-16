const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventoMusicalSchema = new Schema({
  nombre: String,
  año: Number,
  ubicacion: String,
  bandas_participantes: [String],
  asistencia_estimada: Number,
  duracion_dias: Number,
  leyenda: Boolean
}, { timestamps: true });

const EventoMusical = mongoose.model("EventosMusicales", eventoMusicalSchema);

// Funciones CRUD
async function traerEventosMusicales() {
  return await EventoMusical.find();
}

async function traerEventoPorNombre(nombre) {
  return await EventoMusical.findOne({ nombre });
}

async function traerEventoPorId(id) {
  return await EventoMusical.findById(id);
}

async function agregarEventoMusical(data) {
  const nuevo = new EventoMusical(data);
  return await nuevo.save();
}

async function eliminarEventoMusical(id) {
  const result = await EventoMusical.findByIdAndDelete(id);
  return result !== null;
}

async function modificarEventoMusical(id, data) {
  return await EventoMusical.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  traerEventosMusicales,
  traerEventoPorNombre,
  traerEventoPorId,
  agregarEventoMusical,
  eliminarEventoMusical,
  modificarEventoMusical
};