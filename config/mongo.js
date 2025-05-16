const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/conciertosbaraticos";

mongoose.connection.on('connecting', () => {
  console.log('🔄 Intentando conectar a MongoDB...');
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conexión exitosa a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Desconectado de MongoDB');
});

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;