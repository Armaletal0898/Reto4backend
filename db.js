// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOSTDB || 'localhost',
  user: process.env.USERDB || 'root',
  password: process.env.PASSWORDDB || '', 
  database: process.env.DB || 'registro_app', // DB en phpMyAdmin
  port: process.env.PROTDB || 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
