import { useState, useEffect } from 'react';

function Tours({ token,onVerGaleria, onLogout}) {
  const [tours, setTours] = useState([]);

  // Estados individuales para crear un tour
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const [editando, setEditando] = useState(null);

  // 🔑 Función para formatear fecha en formato válido para datetime-local
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  };

  useEffect(() => {
    obtenerTours();
  }, []);

  const obtenerTours = async () => {
    try {
      const resp = await fetch('http://localhost:4000/api/tours', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await resp.json();
      console.log("Tours recibidos:", data);
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener tours:', error);
    }
  };

  const crearTour = async (e) => {
    e.preventDefault();
    try {
      // Convertimos la fecha a ISO antes de enviar
      const nuevoTour = { 
        nombre, 
        precio, 
        fecha: new Date(fecha).toISOString(), 
        duracion, 
        ubicacion 
      };
      const resp = await fetch('http://localhost:4000/api/tours', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoTour)
      });
      if (resp.ok) {
        setNombre('');
        setPrecio('');
        setFecha('');
        setDuracion('');
        setUbicacion('');
        obtenerTours();
      }
    } catch (error) {
      console.error('Error al crear tour:', error);
    }
  };

  const actualizarTour = async (id) => {
    try {
      // Convertimos la fecha a ISO antes de enviar
      const tourActualizado = { ...editando, fecha: new Date(editando.fecha).toISOString() };
      const resp = await fetch(`http://localhost:4000/api/tours/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tourActualizado)
      });
      if (resp.ok) {
        setEditando(null);
        obtenerTours();
      }
    } catch (error) {
      console.error('Error al actualizar tour:', error);
    }
  };

  const eliminarTour = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este tour?')) return;
    try {
      const resp = await fetch(`http://localhost:4000/api/tours/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        obtenerTours();
      }
    } catch (error) {
      console.error('Error al eliminar tour:', error);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={onVerGaleria}>Ir a Reservas</button>
      </nav>

      <h2>Gestión de Tours</h2>

      <h3>Nuevo Tour</h3>
      <form onSubmit={crearTour}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required />
        <input type="datetime-local" value={fecha} onChange={e => setFecha(e.target.value)} required />
        <input type="text" placeholder="Duración (ej. 1.5 horas)" value={duracion} onChange={e => setDuracion(e.target.value)} required />
        <input type="text" placeholder="Ubicación" value={ubicacion} onChange={e => setUbicacion(e.target.value)} required />
        <button type="submit">Agregar Tour</button>
      </form>

      <div>
        {tours.length === 0 ? (
          <p>No hay tours guardados todavía.</p>
        ) : (
          tours.map((tour) => (
            tour ? (
              <div key={tour._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                {editando?._id === tour._id ? (
                  <>
                    <input type="text" value={editando.nombre || ''} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
                    <input type="number" value={editando.precio || ''} onChange={e => setEditando({ ...editando, precio: e.target.value })} />
                    <input type="datetime-local" value={formatDateForInput(editando.fecha)} onChange={e => setEditando({ ...editando, fecha: e.target.value })} />
                    <input type="text" value={editando.duracion || ''} onChange={e => setEditando({ ...editando, duracion: e.target.value })} />
                    <input type="text" value={editando.ubicacion || ''} onChange={e => setEditando({ ...editando, ubicacion: e.target.value })} />
                    <button onClick={() => actualizarTour(tour._id)}>Guardar</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <h4>{tour.nombre}</h4>
                    <p><strong>Precio:</strong> ${tour.precio}</p>
                    <p><strong>Fecha:</strong> {tour.fecha ? new Date(tour.fecha).toLocaleString() : 'Sin fecha'}</p>
                    <p><strong>Duración:</strong> {tour.duracion}</p>
                    <p><strong>Ubicación:</strong> {tour.ubicacion}</p>
                    <button onClick={() => setEditando(tour)}>Editar</button>
                    <button onClick={() => eliminarTour(tour._id)}>Eliminar</button>
                  </>
                )}
              </div>
            ) : null
          ))
        )}
      </div>
    </div>
  );
}

export default Tours;
