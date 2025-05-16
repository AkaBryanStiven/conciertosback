const { Router } = require("express");
const router = Router();
const model = require("../models/discografiasModel");

router.get("/conciertosBaraticos/discografias/obtenerTodas", async (req, res) => {
  try {
    const result = await model.traerDiscografias();
    res.json(result);
  } catch (error) {
    console.error("Error al obtener discografías:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/discografias/obtenerPorTitulo/:titulo", async (req, res) => {
  try {
    const result = await model.traerDiscografiaPorTitulo(req.params.titulo);
    if (!result) return res.status(404).json({ message: "Discografía no encontrada" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener discografía:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/discografias/obtenerPorId/:id", async (req, res) => {
  try {
    const result = await model.traerDiscografiaPorId(req.params.id);
    if (!result) return res.status(404).json({ message: "Discografía no encontrada" });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener discografía por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/conciertosBaraticos/discografias/obtenerPorBanda/:banda", async (req, res) => {
  try {
    const result = await model.traerDiscografiasPorBanda(req.params.banda);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener discografías por banda:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/conciertosBaraticos/discografias/agregar", async (req, res) => {
  try {
    await model.agregarDiscografia(req.body);
    res.status(201).json({ message: "Discografía agregada correctamente 💿" });
  } catch (error) {
    console.error("Error al agregar discografía:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/conciertosBaraticos/discografias/editar/:id", async (req, res) => {
  try {
    const result = await model.modificarDiscografia(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Discografía no encontrada" });
    res.json({ message: "Discografía actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar discografía:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/conciertosBaraticos/discografias/eliminar/:id", async (req, res) => {
  try {
    const success = await model.eliminarDiscografia(req.params.id);
    if (!success) return res.status(404).json({ message: "Discografía no encontrada" });
    res.json({ message: "Discografía eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar discografía:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;