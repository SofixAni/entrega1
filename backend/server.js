/**
 * Servidor Express - API REST
 * Entrega 1 - Semana 3
 * Integración Continua con Docker
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos en memoria (en producción se usaría una base de datos)
let estudiantes = [
  { id: 1, nombre: 'Ana García', carrera: 'Ingeniería de Software', semestre: 6 },
  { id: 2, nombre: 'Carlos Rodríguez', carrera: 'Ingeniería de Sistemas', semestre: 8 },
  { id: 3, nombre: 'María López', carrera: 'Ingeniería de Software', semestre: 5 }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    servicio: 'backend-api',
    timestamp: new Date().toISOString(),
    contenedor: process.env.HOSTNAME || 'desconocido'
  });
});

// Mensaje de bienvenida
app.get('/api/mensaje', (req, res) => {
  res.json({
    mensaje: '¡Hola desde el contenedor del Backend!',
    descripcion: 'Esta respuesta proviene del contenedor backend a través de la red Docker.',
    fecha: new Date().toISOString()
  });
});

// CRUD básico de estudiantes
app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

app.get('/api/estudiantes/:id', (req, res) => {
  const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }
  res.json(estudiante);
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, carrera, semestre } = req.body;
  if (!nombre || !carrera || !semestre) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const nuevo = {
    id: estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1,
    nombre,
    carrera,
    semestre: parseInt(semestre)
  };
  estudiantes.push(nuevo);
  res.status(201).json(nuevo);
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudiantes.findIndex(e => e.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }
  const eliminado = estudiantes.splice(indice, 1)[0];
  res.json({ mensaje: 'Estudiante eliminado', estudiante: eliminado });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
  console.log(`Hostname del contenedor: ${process.env.HOSTNAME || 'local'}`);
});
