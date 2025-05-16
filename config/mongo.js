const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/conciertosbaraticos";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

module.exports = mongoose;