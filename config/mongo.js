const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Falta la variable MONGO_URI en las variables de entorno');
  process.exit(1);
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connection.on('connecting', () => {
  console.log('🔄 Intentando conectar a MongoDB...');
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conexión exitosa a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión a MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Desconectado de MongoDB');
});

(async () => {
  try {
    console.log(`Intentando conectar a MongoDB con URI: ${MONGO_URI.substring(0, 30)}...`);
    await mongoose.connect(MONGO_URI, options);
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
})();

module.exports = mongoose;