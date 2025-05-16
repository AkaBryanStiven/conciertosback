const pool = require("../config/db");

async function traerBandas() {
  const [rows] = await pool.query("SELECT * FROM Bandascover");
  return rows;
}

async function traerBandaPorNombre(nombre) {
  const [rows] = await pool.query("SELECT * FROM Bandascover WHERE nombre = ?", [nombre]);
  return rows;
}

async function traerBandaPorId(id) {
  const [rows] = await pool.query("SELECT * FROM Bandascover WHERE idBanda = ?", [id]);
  return rows;
}

async function agregarBanda(data) {
  const {
    nombre, nombre_inspirado_en, ciudad_origen, años_activos,
    num_integrantes, integrantes_resaca, tiene_triángulo,
    nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
  } = data;

  await pool.query(
    `INSERT INTO Bandascover (
      nombre, nombre_inspirado_en, ciudad_origen, años_activos,
      num_integrantes, integrantes_resaca, tiene_triángulo,
      nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, nombre_inspirado_en, ciudad_origen, años_activos,
     num_integrantes, integrantes_resaca, tiene_triángulo,
     nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original]
  );
}

async function eliminarBanda(id) {
  const [result] = await pool.query("DELETE FROM Bandascover WHERE idBanda = ?", [id]);
  return result.affectedRows > 0;
}

async function modificarBandaId(id, data) {
  const {
    nombre, nombre_inspirado_en, ciudad_origen, años_activos,
    num_integrantes, integrantes_resaca, tiene_triángulo,
    nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original
  } = data;

  const [result] = await pool.query(
    `UPDATE Bandascover SET
      nombre = ?, nombre_inspirado_en = ?, ciudad_origen = ?, años_activos = ?,
      num_integrantes = ?, integrantes_resaca = ?, tiene_triángulo = ?,
      nombre_fanbase = ?, veces_olvidaron_la_letra = ?, porcentaje_similitud_con_original = ?
    WHERE idBanda = ?`,
    [nombre, nombre_inspirado_en, ciudad_origen, años_activos,
     num_integrantes, integrantes_resaca, tiene_triángulo,
     nombre_fanbase, veces_olvidaron_la_letra, porcentaje_similitud_con_original, id]
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
