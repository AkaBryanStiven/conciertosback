const { Router } = require("express");
const router = Router();
const bandasModel = require("../models/bandasModel");

router.get("/conciertosBaraticos/bandas/obtenerTodas", async (_, res) => {
    try {
        const result = await bandasModel.traerBandas();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener bandas" });
    }
});

router.get("/conciertosBaraticos/bandas/obtenerPorNombre/:nombre", async (req, res) => {
    try {
        const result = await bandasModel.traerBandaPorNombre(req.params.nombre);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener banda" });
    }
});

router.get("/conciertosBaraticos/bandas/obtenerPorId/:id", async (req, res) => {
    try {
        const result = await bandasModel.traerBandaPorId(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener banda" });
    }
});

router.post("/conciertosBaraticos/bandas/agregar", async (req, res) => {
    try {
        await bandasModel.agregarBanda(...Object.values(req.body));
        res.status(201).json({ message: "Banda agregada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar banda" });
    }
});

router.delete("/conciertosBaraticos/bandas/eliminar/:id", async (req, res) => {
    try {
        const success = await bandasModel.eliminarBanda(req.params.id);
        if (!success) return res.status(404).json({ message: "No encontrada" });
        res.json({ message: "Banda eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar banda" });
    }
});

router.put("/conciertosBaraticos/bandas/editar/:id", async (req, res) => {
    try {
        const result = await bandasModel.modificarBandaId(req.params.id, ...Object.values(req.body));
        if (result.affectedRows === 0) return res.status(404).json({ message: "No encontrada" });
        res.json({ message: "Banda actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar banda" });
    }
});

module.exports = router;
