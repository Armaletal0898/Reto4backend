// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'interchange.proxy.rlwy.net',
  user: 'root',
  password: 'wgzPWNygKXznAezuoXHnSQOOsXWRLUJX', 
  database: 'registro_app', // DB en phpMyAdmin
  connectionTimeout: 30000
});

connection.connect((err) => {
  if (err) throw err;
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
