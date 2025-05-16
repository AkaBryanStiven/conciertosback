const { Router } = require("express");
const router = Router();
const model = require("../models/bandasRealesModel");

router.get("/conciertosBaraticos/bandasReales/obtenerTodas", async (req, res) => {
  try {
    const result = await model.traerBandasReales();
    res.json(result);
  } catch (error) {
    console.error("Error al obtener bandas reales:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/bandasReales/obtenerPorNombre/:nombre", async (req, res) => {
  try {
    const result = await model.traerBandaRealPorNombre(req.params.nombre);
    if (!result) return res.status(404).json({ message: "Banda no encontrada" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener banda real:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/bandasReales/obtenerPorId/:id", async (req, res) => {
  try {
    const result = await model.traerBandaRealPorId(req.params.id);
    if (!result) return res.status(404).json({ message: "Banda no encontrada" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener banda real por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/conciertosBaraticos/bandasReales/agregar", async (req, res) => {
  try {
    await model.agregarBandaReal(req.body);
    res.status(201).json({ message: "Banda real agregada correctamente 🎸" });
  } catch (error) {
    console.error("Error al agregar banda real:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/conciertosBaraticos/bandasReales/editar/:id", async (req, res) => {
  try {
    const result = await model.modificarBandaReal(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Banda no encontrada" });
    res.json({ message: "Banda actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar banda real:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/conciertosBaraticos/bandasReales/eliminar/:id", async (req, res) => {
  try {
    const success = await model.eliminarBandaReal(req.params.id);
    if (!success) return res.status(404).json({ message: "Banda no encontrada" });
    res.json({ message: "Banda eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar banda real:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;