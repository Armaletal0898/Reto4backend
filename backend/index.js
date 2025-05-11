// Al inicio del archivo, después de los requires
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const path = require('path');

const app = express();
const SECRET_KEY = 'tu_clave_secreta_super_segura';



// Con una configuración más detallada:
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Almacenamiento temporal de ubicaciones de conductores
let drivers = {};

// --------------------- RUTAS DE USUARIOS ---------------------

// ✅ Registro de nuevo usuario
app.post('/registro', async (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !telefono || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const checkQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar el usuario' });

    if (results.length > 0) {
      return res.status(409).json({ error: 'El usuario ya está registrado' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [nombre, email, telefono, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al registrar el usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al cifrar la contraseña' });
    }
  });
});

// ✅ Login con JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el usuario' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Generar token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });

      res.json({ message: 'Inicio de sesión exitoso', token, nombre: user.nombre });
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar la contraseña' });
    }
  });
});

// ✅ Ruta para verificar token
app.get('/api/verificar-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    res.json({ message: 'Token válido', usuario: decoded });
  });
});

// --------------------- RUTAS DE CHOFERES ---------------------

app.post('/update-location', (req, res) => {
  const { driverId, latitude, longitude } = req.body;
  if (!driverId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  drivers[driverId] = { latitude, longitude };
  res.json({ message: 'Ubicación actualizada' });
});

app.get('/get-location/:driverId', (req, res) => {
  const driver = drivers[req.params.driverId];
  if (!driver) {
    return res.status(404).json({ error: 'Chofer no encontrado' });
  }
  res.json(driver);
});

app.get('/get-all-locations', (req, res) => {
  res.json(drivers);
});

app.delete('/delete-location/:driverId', (req, res) => {
  const { driverId } = req.params;
  if (drivers[driverId]) {
    delete drivers[driverId];
    res.json({ message: `Ubicación del chofer ${driverId} eliminada` });
  } else {
    res.status(404).json({ error: 'Chofer no encontrado' });
  }
});

// --------------------- INICIAR SERVIDOR ---------------------

// Asegúrate de que el puerto se obtenga de las variables de entorno
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
