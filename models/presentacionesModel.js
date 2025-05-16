const pool = require("../config/db");

async function traerPresentaciones() {
  const [rows] = await pool.query("SELECT * FROM Presentaciones");
  return rows;
}

async function traerPorLugar(lugar) {
  const [rows] = await pool.query("SELECT * FROM Presentaciones WHERE lugar = ?", [lugar]);
  return rows;
}

async function traerPorLugarYFecha(lugar, fecha) {
  const [rows] = await pool.query("SELECT * FROM Presentaciones WHERE lugar = ? AND fecha = ?", [lugar, fecha]);
  return rows;
}

async function agregarPresentacion(data) {
  const {
    idBanda, idCancion, lugar, fecha, publico_aproximado,
    duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico
  } = data;

  const [result] = await pool.query(
    `INSERT INTO Presentaciones (
      idBanda, idCancion, lugar, fecha, publico_aproximado,
      duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [idBanda, idCancion, lugar, fecha, publico_aproximado,
     duracion_minutos, sonido_fallo, guitarrista_rompio_cuerda, rating_publico]
  );

  return result;
}

async function eliminarPresentacion(idBanda, idCancion, fecha) {
  const [result] = await pool.query(
    "DELETE FROM Presentaciones WHERE idBanda = ? AND idCancion = ? AND fecha = ?",
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

  const [result] = await pool.query(
    `UPDATE Presentaciones SET
      lugar = ?, publico_aproximado = ?, duracion_minutos = ?,
      sonido_fallo = ?, guitarrista_rompio_cuerda = ?, rating_publico = ?
    WHERE idBanda = ? AND idCancion = ? AND fecha = ?`,
    [lugar, publico_aproximado, duracion_minutos,
     sonido_fallo, guitarrista_rompio_cuerda, rating_publico,
     idBanda, idCancion, fecha]
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
