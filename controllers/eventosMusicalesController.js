const { Router } = require("express");
const router = Router();
const model = require("../models/eventosMusicalesModel");

router.get("/conciertosBaraticos/eventos/obtenerTodos", async (req, res) => {
  try {
    const result = await model.traerEventosMusicales();
    res.json(result);
  } catch (error) {
    console.error("Error al obtener eventos musicales:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/eventos/obtenerPorNombre/:nombre", async (req, res) => {
  try {
    const result = await model.traerEventoPorNombre(req.params.nombre);
    if (!result) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener evento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/eventos/obtenerPorId/:id", async (req, res) => {
  try {
    const result = await model.traerEventoPorId(req.params.id);
    if (!result) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener evento por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/conciertosBaraticos/eventos/agregar", async (req, res) => {
  try {
    await model.agregarEventoMusical(req.body);
    res.status(201).json({ message: "Evento agregado correctamente 🎤" });
  } catch (error) {
    console.error("Error al agregar evento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/conciertosBaraticos/eventos/editar/:id", async (req, res) => {
  try {
    const result = await model.modificarEventoMusical(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Evento no encontrado" });
    res.json({ message: "Evento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/conciertosBaraticos/eventos/eliminar/:id", async (req, res) => {
  try {
    const success = await model.eliminarEventoMusical(req.params.id);
    if (!success) return res.status(404).json({ message: "Evento no encontrado" });
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;