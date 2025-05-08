// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sin contraseña por defecto en XAMPP
  database: 'registro_app' // Asegúrate de crear esta DB en phpMyAdmin
});

connection.connect((err) => {
  if (err) throw err;
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
