import { useState } from 'react';
import Login from './Login';             // Componente de login
import Registro from './Registro';
import Tours from './Tours';
import Reservas from './Reservas';

function App() {
  const [vistaActual, setVistaActual] = useState('login');
  const [token, setToken] = useState(null);

  // Cuando el login es exitoso:
  const handleLoginSuccess = (tokenRecibido) => {
    setToken(tokenRecibido);
    setVistaActual('tours');   // pasamos a la vista principal de tours
  };

  // Funciones para cambiar entre vistas (login/registro)
  const irARegistro = () => setVistaActual('registro');
  const irALogin = () => setVistaActual('login');

  // Cerrar sesión
  const handleLogout = () => {
    setToken(null);
    setVistaActual('login');
  };

  // Cambio a reservas
  const irAReservas = () => setVistaActual('reservas');

  // Volver de reservas a tours
  const volverATours = () => setVistaActual('tours');

  return (
    <div className="App">
      {token ? (
        // Si hay token (usuario autenticado), mostrar la interfaz principal
        <>
          {vistaActual === 'tours' && 
            <Tours token={token} onVerGaleria={irAReservas} onLogout={handleLogout} />
          }
          {vistaActual === 'reservas' && 
            <Reservas token={token} onVolverDisenno={volverATours} onLogout={handleLogout} />
          }
        </>
      ) : (
        // Si no hay token, mostrar formulario de login o registro
        <>
          {vistaActual === 'login' && 
            <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={irARegistro} />
          }
          {vistaActual === 'registro' && 
            <Registro onSwitchToLogin={irALogin} />
          }
        </>
      )}
    </div>
  );
}
export default App;