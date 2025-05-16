const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Conexiones a bases de datos
require("./config/db"); // MySQL
require("./config/mongo"); // MongoDB

// Importar controladores existentes (MySQL)
const bandasController = require("./controllers/bandasController");
const cancionesController = require("./controllers/cancionesController");
const presentacionesController = require("./controllers/presentacionesController");

// Importar nuevos controladores (MongoDB)
const bandasRealesController = require("./controllers/bandasRealesController");
const eventosMusicalesController = require("./controllers/eventosMusicalesController");
const discografiasController = require("./controllers/discografiasController");

// Middleware
const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*"
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Rutas existentes (MySQL)
app.use(bandasController);
app.use(cancionesController);
app.use(presentacionesController);

// Nuevas rutas (MongoDB)
app.use(bandasRealesController);
app.use(eventosMusicalesController);
app.use(discografiasController);

console.log("Variables de entorno:");
console.log({
  MONGO_URI: process.env.MONGO_URI,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎸 Servidor escuchando en el puerto ${PORT}`);
});