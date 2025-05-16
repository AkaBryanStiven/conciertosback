const express = require("express");
const router = express.Router();
const model = require("../models/presentacionesModel");

router.get("/conciertosBaraticos/presentaciones/obtenerTodas", async (req, res) => {
  try {
    const result = await model.traerPresentaciones();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener presentaciones" });
  }
});

router.get("/conciertosBaraticos/presentaciones/porLugar/:lugar", async (req, res) => {
  try {
    const result = await model.traerPorLugar(req.params.lugar);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar por lugar" });
  }
});

router.get("/conciertosBaraticos/presentaciones/porLugarYFecha", async (req, res) => {
  try {
    const { lugar, fecha } = req.query;
    const result = await model.traerPorLugarYFecha(lugar, fecha);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar por lugar y fecha" });
  }
});

router.post("/conciertosBaraticos/presentaciones/agregar", async (req, res) => {
  try {
    await model.agregarPresentacion(req.body);
    res.status(201).json({ message: "Presentación agregada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar presentación" });
  }
});

router.delete("/conciertosBaraticos/presentaciones/eliminar/:idBanda/:idCancion/:fecha", async (req, res) => {
  try {
    const { idBanda, idCancion, fecha } = req.params;
    const success = await model.eliminarPresentacion(idBanda, idCancion, fecha);
    if (!success) return res.status(404).json({ message: "No encontrada" });
    res.json({ message: "Presentación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar presentación" });
  }
});

router.put("/conciertosBaraticos/presentaciones/actualizar/:idBanda/:idCancion/:fecha", async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const result = await model.actualizarPresentacion(data);
    if (result.affectedRows === 0) return res.status(404).json({ message: "No encontrada" });
    res.json({ message: "Presentación actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar presentación" });
  }
});

module.exports = router;
