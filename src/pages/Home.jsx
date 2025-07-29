import { Link } from 'react-router-dom';
import { useCitas } from '../hooks/useCitas';


export default function Home() {
  const { citas, cuposMaximos } = useCitas();

  const hoy = new Date().toISOString().split('T')[0];

  // Filtrar citas de hoy y futuras
  const citasHoy = citas.filter(c => c.fecha === hoy);
  const citasFuturas = citas.filter(c => c.fecha > hoy);

  // Calcular cupos ocupados hoy
  const cuposDisponibles = cuposMaximos - citasHoy.length;

  return (
    <div className="home-page">
      {/* Sección principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🦷 Citas Médicas</h1>
          <p className="hero-subtitle">
            Agenda y gestiona tus citas odontológicas de manera fácil y rápida.
          </p>
          <div className="hero-buttons">
            <Link to="/crear-citas" className="cta-button primary">
              Reservar Cita
            </Link>
            <Link to="/citas" className="cta-button secondary">
              Ver Mis Citas
            </Link>
          </div>
        </div>
      </section>

      {/* Resumen de citas */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{citasHoy.length}</span>
            <span className="stat-label">Citas Hoy</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{citasFuturas.length}</span>
            <span className="stat-label">Citas Futuras</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{cuposDisponibles}</span>
            <span className="stat-label">Cupos Disponibles Hoy</span>
          </div>
        </div>
      </section>

      {/* Enlace rápido */}
      <section className="section-footer">
        <Link to="/admin" className="view-all-link">
          Ir al Panel del Doctor →
        </Link>
      </section>
    </div>
  );
}
