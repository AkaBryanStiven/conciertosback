const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bandasController = require("./controllers/bandasController");
const cancionesController = require("./controllers/cancionesController");
const presentacionesController = require("./controllers/presentacionesController");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*"
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

// Usamos directamente los controladores que manejan sus rutas internas
app.use(bandasController);
app.use(cancionesController);
app.use(presentacionesController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
