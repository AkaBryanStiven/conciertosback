const connection = require("../config/db");

async function traerPresentaciones() {
    const [result] = await connection.query("SELECT * FROM presentaciones");
    return result;
}

async function traerPorLugar(lugar) {
    const [result] = await connection.query(
        "SELECT * FROM presentaciones WHERE lugar = ?",
        [lugar]
    );
    return result;
}

async function traerPorLugarYFecha(lugar, fecha) {
    const [result] = await connection.query(
        "SELECT * FROM presentaciones WHERE lugar = ? AND fecha = ?",
        [lugar, fecha]
    );
    return result;
}

async function agregarPresentacion(data) {
    const {
        idBanda, idCancion, lugar, fecha, publico_aproximado,
        duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico
    } = data;

    const [result] = await connection.query(
        `INSERT INTO presentaciones (
            idBanda, idCancion, lugar, fecha, publico_aproximado,
            duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            idBanda, idCancion, lugar, fecha, publico_aproximado,
            duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico
        ]
    );

    return result;
}

async function eliminarPresentacion(idBanda, idCancion, fecha) {
    const [result] = await connection.query(
        "DELETE FROM presentaciones WHERE idBanda = ? AND idCancion = ? AND fecha = ?",
        [idBanda, idCancion, fecha]
    );
    return result.affectedRows > 0;
}

async function actualizarPresentacion(data) {
    const {
        idBanda, idCancion, fecha,
        lugar, publico_aproximado, duracion_minutos,
        sonido_fallo, guitarrista_rompio_cuerda, rating_publico
    } = data;

    const [result] = await connection.query(
        `UPDATE presentaciones SET
            lugar = ?, publico_aproximado = ?, duracion_minutos = ?,
            sonido_fallo = ?, guitarrista_rompio_cuerda = ?, rating_publico = ?
        WHERE idBanda = ? AND idCancion = ? AND fecha = ?`,
        [
            lugar, publico_aproximado, duracion_minutos,
            sonido_fallo, guitarrista_rompio_cuerda, rating_publico,
            idBanda, idCancion, fecha
        ]
    );

    return result;
}

module.exports = {
    traerPresentaciones,
    traerPorLugar,
    traerPorLugarYFecha,
    agregarPresentacion,
    eliminarPresentacion,
    actualizarPresentacion,
};
