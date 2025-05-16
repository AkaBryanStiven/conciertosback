const connection = require("../config/db");

async function traerBandas() {
    const [result] = await connection.query("SELECT * FROM bandascover");
    return result;
}

async function traerBandaPorNombre(nombre) {
    const [result] = await connection.query("SELECT * FROM bandascover WHERE nombre = ?", [nombre]);
    return result;
}

async function traerBandaPorId(id) {
    const [result] = await connection.query("SELECT * FROM bandascover WHERE idBanda = ?", [id]);
    return result;
}

async function agregarBanda(
    nombre, nombre_inspirado_en, ciudad_origen, años_activos,
    num_integrantes, integrantes_resaca, tiene_triángulo,
    nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
) {
    const [result] = await connection.query(
        `INSERT INTO bandascover (
            nombre, nombre_inspirado_en, ciudad_origen, años_activos,
            num_integrantes, integrantes_resaca, tiene_triángulo,
            nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nombre, nombre_inspirado_en, ciudad_origen, años_activos,
            num_integrantes, integrantes_resaca, tiene_triángulo,
            nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
        ]
    );
    return result;
}

async function eliminarBanda(id) {
    const [result] = await connection.query("DELETE FROM bandascover WHERE idBanda = ?", [id]);
    return result.affectedRows > 0;
}

async function modificarBandaId(
    id, nombre, nombre_inspirado_en, ciudad_origen, años_activos,
    num_integrantes, integrantes_resaca, tiene_triángulo,
    nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
) {
    const [result] = await connection.query(
        `UPDATE bandascover SET
            nombre = ?, nombre_inspirado_en = ?, ciudad_origen = ?, años_activos = ?,
            num_integrantes = ?, integrantes_resaca = ?, tiene_triángulo = ?,
            nombre_fanbase = ?, veces_olvidaron_la_letra = ?, porcentaje_similitud_con_original = ?
        WHERE idBanda = ?`,
        [
            nombre, nombre_inspirado_en, ciudad_origen, años_activos,
            num_integrantes, integrantes_resaca, tiene_triángulo,
            nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original, id
        ]
    );
    return result;
}

module.exports = {
    traerBandas,
    traerBandaPorNombre,
    traerBandaPorId,
    agregarBanda,
    eliminarBanda,
    modificarBandaId,
};
