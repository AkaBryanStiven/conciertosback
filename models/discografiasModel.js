const mongoose = require("mongoose");
const { Schema } = mongoose;

const discografiaSchema = new Schema({
  titulo: String,
  banda: String,
  año_lanzamiento: Number,
  genero: String,
  canciones: [String],
  duracion_minutos: Number,
  discografica: String,
  certificaciones: String,
  portada: String
}, { timestamps: true });

const Discografia = mongoose.model("Discografias", discografiaSchema);

// Funciones CRUD
async function traerDiscografias() {
  return await Discografia.find();
}

async function traerDiscografiaPorTitulo(titulo) {
  return await Discografia.findOne({ titulo });
}

async function traerDiscografiaPorId(id) {
  return await Discografia.findById(id);
}

async function traerDiscografiasPorBanda(banda) {
  return await Discografia.find({ banda });
}

async function agregarDiscografia(data) {
  const nuevo = new Discografia(data);
  return await nuevo.save();
}

async function eliminarDiscografia(id) {
  const result = await Discografia.findByIdAndDelete(id);
  return result !== null;
}

async function modificarDiscografia(id, data) {
  return await Discografia.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  traerDiscografias,
  traerDiscografiaPorTitulo,
  traerDiscografiaPorId,
  traerDiscografiasPorBanda,
  agregarDiscografia,
  eliminarDiscografia,
  modificarDiscografia
};