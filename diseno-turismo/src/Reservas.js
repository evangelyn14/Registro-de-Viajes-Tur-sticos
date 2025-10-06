import { useState, useEffect } from 'react';

function Reservas({ token, onVolverDisenno,onLogout}) {
  const [tours, setTours] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [tourSeleccionado, setTourSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState(1);
  const [editando, setEditando] = useState(null);

  // Cargar tours y reservas al montar
  useEffect(() => {
    obtenerTours();
    obtenerReservas();
  }, []);

  const obtenerTours = async () => {
    try {
      const resp = await fetch('http://localhost:4000/api/tours', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await resp.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener tours:', error);
    }
  };

  const obtenerReservas = async () => {
    try {
      const resp = await fetch('http://localhost:4000/api/reservas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await resp.json();
      setReservas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
  };

  // Crear reserva
  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      const nuevaReserva = { tourId: tourSeleccionado, fecha, personas };
      const resp = await fetch('http://localhost:4000/api/reservas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevaReserva)
      });
      if (resp.ok) {
        setTourSeleccionado('');
        setFecha('');
        setPersonas(1);
        obtenerReservas();
      }
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };

  // Actualizar reserva
  const actualizarReserva = async (id) => {
    try {
      const resp = await fetch(`http://localhost:4000/api/reservas/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editando)
      });
      if (resp.ok) {
        setEditando(null);
        obtenerReservas();
      }
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  };

  // Cancelar reserva
  const cancelarReserva = async (id) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta reserva?')) return;
    try {
      const resp = await fetch(`http://localhost:4000/api/reservas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        obtenerReservas();
      }
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={onVolverDisenno}>Volver a Tours</button>
      </nav>

      <h2>Reservar Tour</h2>

      {/* Formulario para nueva reserva */}
      <form onSubmit={crearReserva}>
        <select 
          value={tourSeleccionado} 
          onChange={e => setTourSeleccionado(e.target.value)} 
          required
        >
          <option value="">Selecciona un tour</option>
          {tours.map(tour => (
            <option key={tour._id} value={tour._id}>
              {tour.nombre} – ${tour.precio}
            </option>
          ))}
        </select>

        <input 
          type="date" 
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
        />

        <input 
          type="number" 
          min="1"
          value={personas}
          onChange={e => setPersonas(parseInt(e.target.value))}
          required
        />

        <button type="submit">Reservar</button>
      </form>

      <h3>Mis Reservas</h3>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva._id}>
            {editando?._id === reserva._id ? (
              <>
                <input 
                  type="date" 
                  value={editando.fecha}
                  onChange={e => setEditando({ ...editando, fecha: e.target.value })}
                />
                <input 
                  type="number" 
                  min="1"
                  value={editando.personas}
                  onChange={e => setEditando({ ...editando, personas: parseInt(e.target.value) })}
                />
                <button onClick={() => actualizarReserva(reserva._id)}>Guardar</button>
                <button onClick={() => setEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{reserva.tour?.nombre}</strong> – {reserva.fecha} – {reserva.personas} personas
                <button onClick={() => setEditando(reserva)}>Editar</button>
                <button onClick={() => cancelarReserva(reserva._id)}>Cancelar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;
