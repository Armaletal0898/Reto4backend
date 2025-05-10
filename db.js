// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOSTDB || 'interchange.proxy.rlwy.net',
  user: process.env.USERDB || 'root',
  password: process.env.PASSWORDDB || 'wgzPWNygKXznAezuoXHnSQOOsXWRLUJX', 
  database: process,env.DB || 'registro_app', // DB en phpMyAdmin
  port: process.env.PROTDB || 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('🟢 Conectado a MySQL');
});

module.exports = connection;
