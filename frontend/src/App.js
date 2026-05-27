import React, { useState, useEffect } from 'react';

// La URL del backend se resuelve por el nombre del servicio en la red Docker
// cuando corre en docker-compose, o por localhost en desarrollo local.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function App() {
  const [health, setHealth] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', carrera: '', semestre: '' });

  // Verificar conexión con backend al cargar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [healthRes, mensajeRes, estudiantesRes] = await Promise.all([
        fetch(`${API_URL}/api/health`),
        fetch(`${API_URL}/api/mensaje`),
        fetch(`${API_URL}/api/estudiantes`)
      ]);

      setHealth(await healthRes.json());
      setMensaje(await mensajeRes.json());
      setEstudiantes(await estudiantesRes.json());
    } catch (err) {
      setError('No se pudo conectar con el backend. Verifica que el contenedor esté corriendo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const agregarEstudiante = async () => {
    if (!form.nombre || !form.carrera || !form.semestre) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const nuevo = await res.json();
      setEstudiantes([...estudiantes, nuevo]);
      setForm({ nombre: '', carrera: '', semestre: '' });
    } catch (err) {
      alert('Error al agregar estudiante');
    }
  };

  const eliminarEstudiante = async (id) => {
    try {
      await fetch(`${API_URL}/api/estudiantes/${id}`, { method: 'DELETE' });
      setEstudiantes(estudiantes.filter(e => e.id !== id));
    } catch (err) {
      alert('Error al eliminar estudiante');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Entrega 1 - Semana 3</h1>
        <p className="subtitle">Integración Continua con Docker · Comunicación entre contenedores</p>
        {!loading && (
          <span className={`status-badge ${error ? 'status-error' : 'status-ok'}`}>
            {error ? '✗ Backend desconectado' : '✓ Backend conectado'}
          </span>
        )}
      </div>

      {loading ? (
        <div className="card loading">Cargando datos del backend...</div>
      ) : error ? (
        <div className="card">
          <p style={{ color: '#721c24' }}>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid">
            <div className="card">
              <h2>Estado del Backend</h2>
              <div className="info-row">
                <span className="info-label">Servicio:</span>
                <span className="info-value">{health?.servicio}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estado:</span>
                <span className="info-value">{health?.status}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Contenedor:</span>
                <span className="info-value">{health?.contenedor}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Timestamp:</span>
                <span className="info-value">{new Date(health?.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="card">
              <h2>Mensaje del Backend</h2>
              <p style={{ marginBottom: '10px', color: '#1e3c72', fontWeight: '600' }}>
                {mensaje?.mensaje}
              </p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
                {mensaje?.descripcion}
              </p>
            </div>
          </div>

          <div className="form-container" style={{ marginBottom: '25px' }}>
            <h2>Agregar Estudiante</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div className="form-group">
                <label>Carrera</label>
                <input
                  type="text"
                  value={form.carrera}
                  onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                  placeholder="Carrera"
                />
              </div>
              <div className="form-group">
                <label>Semestre</label>
                <input
                  type="number"
                  value={form.semestre}
                  onChange={(e) => setForm({ ...form, semestre: e.target.value })}
                  placeholder="1-10"
                  min="1"
                  max="10"
                />
              </div>
              <button className="btn-agregar" onClick={agregarEstudiante}>
                Agregar
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Estudiantes ({estudiantes.length})</h2>
            <ul className="estudiantes-list">
              {estudiantes.map((est) => (
                <li key={est.id} className="estudiante-item">
                  <div className="estudiante-info">
                    <strong>{est.nombre}</strong>
                    <span>{est.carrera} · Semestre {est.semestre}</span>
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarEstudiante(est.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="footer">
        Entrega 1 - Semana 3 · Frontend (React) ↔ Backend (Node.js/Express) · Comunicados vía red Docker
      </div>
    </div>
  );
}

export default App;
