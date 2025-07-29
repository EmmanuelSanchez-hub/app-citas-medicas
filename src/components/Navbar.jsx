import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase/config";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Observar cambios en la sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  // Función para resaltar la ruta activa
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          🦷 Citas Médicas
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>
          🏠 Inicio
        </Link>
        <Link to="/crear-citas" className={isActive('/crear-citas')}>
          📅 Reservar Cita
        </Link>
        <Link to="/citas" className={isActive('/citas')}>
          🗂️ Citas
        </Link>

        {/* Solo mostramos Panel Doctor si está logueado */}
        {usuario && (
          <Link to="/admin" className={isActive('/admin')}>
            👩‍⚕️ Panel Doctor
          </Link>
        )}

        {/* Login/Logout */}
        {!usuario ? (
          <Link to="/login" className={isActive('/login')}>
            🔑 Iniciar Sesión
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            🚪 Cerrar Sesión ({usuario.email})
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


