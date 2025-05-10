// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'reto4backend-production.up.railway.app',
  port: "57727",
  user: 'root',
  password: 'wgzPWNygKXznAezuoXHnSQOOsXWRLUJX', // Sin contraseña por defecto en XAMPP
  database: 'registro_app' // Asegúrate de crear esta DB en phpMyAdmin
  connectionTimeout: 30000
});

connection.connect((err) => {
  if (err) throw err;
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
