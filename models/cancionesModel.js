const pool = require("../config/db");

async function traerCanciones() {
  const [rows] = await pool.query("SELECT * FROM cancionesReales");
  return rows;
}

async function traerCancionPorTitulo(titulo) {
  const [rows] = await pool.query("SELECT * FROM cancionesReales WHERE titulo = ?", [titulo]);
  return rows;
}

async function agregarCancion(cancion) {
  const {
    titulo, banda_original, año_lanzamiento, genero,
    duracion_segundos, tiene_solo_guitarra, es_clasico,
    veces_versionada, idioma, popularidad_global
  } = cancion;

  const [result] = await pool.query(
    `INSERT INTO cancionesReales (
      titulo, banda_original, año_lanzamiento, genero,
      duracion_segundos, tiene_solo_guitarra, es_clasico,
      veces_versionada, idioma, popularidad_global
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [titulo, banda_original, año_lanzamiento, genero,
     duracion_segundos, tiene_solo_guitarra, es_clasico,
     veces_versionada, idioma, popularidad_global]
  );

  return result;
}

async function eliminarCancion(titulo) {
  const [result] = await pool.query("DELETE FROM cancionesReales WHERE titulo = ?", [titulo]);
  return result.affectedRows > 0;
}

async function actualizarCancion(titulo, nuevaData) {
  const {
    banda_original, año_lanzamiento, genero,
    duracion_segundos, tiene_solo_guitarra, es_clasico,
    veces_versionada, idioma, popularidad_global
  } = nuevaData;

  const [result] = await pool.query(
    `UPDATE cancionesReales SET
      banda_original = ?, año_lanzamiento = ?, genero = ?,
      duracion_segundos = ?, tiene_solo_guitarra = ?, es_clasico = ?,
      veces_versionada = ?, idioma = ?, popularidad_global = ?
    WHERE titulo = ?`,
    [banda_original, año_lanzamiento, genero,
     duracion_segundos, tiene_solo_guitarra, es_clasico,
     veces_versionada, idioma, popularidad_global, titulo]
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
