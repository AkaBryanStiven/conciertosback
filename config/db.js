const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost", // cambia esto por tu host de Railway
    user: "root",      // usuario de tu Railway
    password: "password", // contraseña real
    database: "conciertosbaraticos", // base en Railway
});

module.exports = connection;
