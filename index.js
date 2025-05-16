const express = require("express");
const morgan = require("morgan");

const bandasController = require("./controllers/bandasController");
const cancionesController = require("./controllers/cancionesController");
const presentacionesController = require("./controllers/presentacionesController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Controladores directamente
app.use(bandasController);
app.use(cancionesController);
app.use(presentacionesController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
