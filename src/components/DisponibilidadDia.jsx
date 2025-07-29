import { useCitas } from "../hooks/useCitas";

export default function DisponibilidadDia({ fecha }) {
  const { citas, cuposMaximos } = useCitas();
  const citasHoy = citas.filter(c => c.fecha === fecha);
  const cupos = cuposMaximos - citasHoy.length;

  return (
    <div className="stats-section">
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">{citasHoy.length}</span>
          <span className="stat-label">Citas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{cupos}</span>
          <span className="stat-label">Cupos disponibles</span>
        </div>
      </div>
    </div>
  );
}
