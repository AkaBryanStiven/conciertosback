const mongoose = require("mongoose");
const { Schema } = mongoose;

const bandaRealSchema = new Schema({
  nombre: String,
  genero: String,
  año_formacion: Number,
  pais_origen: String,
  miembros_fundadores: [String],
  albumes_estudio: Number,
  activa: Boolean,
  influencias: [String]
}, { timestamps: true });

const BandaReal = mongoose.model("bandasreales", bandaRealSchema);

// Funciones CRUD
async function traerBandasReales() {
  return await BandaReal.find();
}

async function traerBandaRealPorNombre(nombre) {
  return await BandaReal.findOne({ nombre });
}

async function traerBandaRealPorId(id) {
  return await BandaReal.findById(id);
}

async function agregarBandaReal(data) {
  const nueva = new BandaReal(data);
  return await nueva.save();
}

async function eliminarBandaReal(id) {
  const result = await BandaReal.findByIdAndDelete(id);
  return result !== null;
}

async function modificarBandaReal(id, data) {
  return await BandaReal.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  traerBandasReales,
  traerBandaRealPorNombre,
  traerBandaRealPorId,
  agregarBandaReal,
  eliminarBandaReal,
  modificarBandaReal
};