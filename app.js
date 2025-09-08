const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const { verificarToken } = require('./seguridad/auth');

const app = express();
// Conexión a MongoDB
connectDB();
// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api/tours', require('./routes/tours'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/reservas', require('./routes/reservas'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tours', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tours.html'));
});

app.get('/reservas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reservas.html'));
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});