const connection = require("../config/db");

async function traerCanciones() {
    const [result] = await connection.query("SELECT * FROM cancionesreales");
    return result;
}

async function traerCancionPorTitulo(titulo) {
    const [result] = await connection.query(
        "SELECT * FROM cancionesreales WHERE titulo = ?",
        [titulo]
    );
    return result;
}

async function agregarCancion(cancion) {
    const {
        titulo, banda_original, año_lanzamiento, genero,
        duracion_segundos, tiene_solo_guitarra, es_clasico,
        veces_versionada, idioma, popularidad_global
    } = cancion;

    const [result] = await connection.query(
        `INSERT INTO cancionesreales (
            titulo, banda_original, año_lanzamiento, genero,
            duracion_segundos, tiene_solo_guitarra, es_clasico,
            veces_versionada, idioma, popularidad_global
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            titulo, banda_original, año_lanzamiento, genero,
            duracion_segundos, tiene_solo_guitarra, es_clasico,
            veces_versionada, idioma, popularidad_global
        ]
    );

    return result;
}

async function eliminarCancion(titulo) {
    const [result] = await connection.query(
        "DELETE FROM cancionesreales WHERE titulo = ?",
        [titulo]
    );
    return result.affectedRows > 0;
}

async function actualizarCancion(titulo, nuevaData) {
    const {
        banda_original, año_lanzamiento, genero,
        duracion_segundos, tiene_solo_guitarra, es_clasico,
        veces_versionada, idioma, popularidad_global
    } = nuevaData;

    const [result] = await connection.query(
        `UPDATE cancionesreales SET
            banda_original = ?, año_lanzamiento = ?, genero = ?,
            duracion_segundos = ?, tiene_solo_guitarra = ?, es_clasico = ?,
            veces_versionada = ?, idioma = ?, popularidad_global = ?
        WHERE titulo = ?`,
        [
            banda_original, año_lanzamiento, genero,
            duracion_segundos, tiene_solo_guitarra, es_clasico,
            veces_versionada, idioma, popularidad_global,
            titulo
        ]
    );

    return result;
}

module.exports = {
    traerCanciones,
    traerCancionPorTitulo,
    agregarCancion,
    eliminarCancion,
    actualizarCancion,
};
