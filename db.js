// db.js
const mysql = require('mysql2');

// Corregido PROTDB a PORTDB
const connection = mysql.createConnection({
  host: process.env.HOSTDB || 'localhost',
  user: process.env.USERDB || 'root',
  password: process.env.PASSWORDDB || '', 
  database: process.env.DB || 'registro_app',
  port: process.env.PORTDB || 3306, // Corregido de PROTDB a PORTDB
  connectTimeout: 10000 // Aumentar el tiempo de espera para conexiones lentas
});

// Mejor manejo de errores
connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
    console.error('Detalles del error:', {
      code: err.code,
      errno: err.errno,
      sqlState: err.sqlState,
      sqlMessage: err.sqlMessage
    });
    
    // No lanzar el error para evitar que la aplicación se detenga
    console.error('La aplicación continuará sin conexión a la base de datos');
    return;
  }
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
