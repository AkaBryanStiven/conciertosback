const { Router } = require("express");
const router = Router();
const model = require("../models/cancionesModel");

router.get("/conciertosBaraticos/canciones/obtenerTodas", async (_, res) => {
    try {
        const result = await model.traerCanciones();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/conciertosBaraticos/canciones/obtenerPorTitulo/:titulo", async (req, res) => {
    try {
        const result = await model.traerCancionPorTitulo(req.params.titulo);
        if (result.length === 0) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar canción" });
    }
});

router.post("/conciertosBaraticos/canciones/agregar", async (req, res) => {
    try {
        await model.agregarCancion(req.body);
        res.status(201).json({ message: "Canción agregada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar canción" });
    }
});

router.delete("/conciertosBaraticos/canciones/eliminar/:titulo", async (req, res) => {
    try {
        const success = await model.eliminarCancion(req.params.titulo);
        if (!success) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }
        res.json({ message: "Canción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar canción" });
    }
});

router.put("/conciertosBaraticos/canciones/actualizar/:titulo", async (req, res) => {
    try {
        const result = await model.actualizarCancion(req.params.titulo, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }
        res.json({ message: "Canción actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar canción" });
    }
});

module.exports = router;
