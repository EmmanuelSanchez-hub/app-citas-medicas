import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Función para resaltar la ruta activa
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
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
        <Link to="/admin" className={isActive('/admin')}>
          👩‍⚕️ Panel Doctor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

