import { useState } from "react";
import { useCitas } from "../hooks/useCitas";

export default function Admin() {
  const { 
    citas, 
    aprobarReprogramacion, 
    rechazarReprogramacion,
    confirmarCita // NUEVO
  } = useCitas();

  // Estados para los filtros
  const [busqueda, setBusqueda] = useState("");
  const [mesFiltro, setMesFiltro] = useState("");

  // Ordenar citas por fecha (más cercana primero)
  const citasOrdenadas = [...citas].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaA - fechaB;
  });

  // Filtrar por nombre y por mes
  const citasFiltradas = citasOrdenadas.filter((c) => {
    const coincideNombre = c.paciente
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideMes = mesFiltro
      ? c.fecha.startsWith(mesFiltro) // compara "YYYY-MM"
      : true;

    return coincideNombre && coincideMes;
  });

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1 className="page-title">👩‍⚕️ Panel de Administración</h1>
        <p className="page-subtitle">
          Revisa todas las citas, confirma reprogramaciones y gestiona el estado
          de las reservas.
        </p>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtro-item filtro-nombre">
          <input
            type="text"
            placeholder="Buscar por paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="filtro-item filtro-mes">
          <input
            type="month"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {citasFiltradas.length === 0 ? (
        <p>No hay citas para mostrar.</p>
      ) : (
        <div className="citas-grid">
          {citasFiltradas.map((cita) => (
            <div key={cita.id} className="cita-card">
              <div className="cita-content">
                <h3 className="cita-title">Paciente: {cita.paciente}</h3>

                <div className="cita-meta">
                  <span>📅 {cita.fecha}</span>
                  <span>⏰ {cita.hora}</span>
                  <span>
                    Estado:{" "}
                    {cita.estado === "solicitud_reprogramacion"
                      ? "🟡 Solicitud de reprogramación"
                      : cita.estado === "confirmada"
                      ? "✅ Confirmada"
                      : "⏳ Pendiente"}
                  </span>
                </div>

                {cita.motivo && (
                  <div className="cita-motivo">
                    <strong>Motivo:</strong> {cita.motivo}
                  </div>
                )}

                {/* Botones para reprogramación */}
                {cita.estado === "solicitud_reprogramacion" && (
                  <div className="cita-actions" style={{ marginTop: "1rem" }}>
                    <button
                      className="form-button primary"
                      onClick={() => aprobarReprogramacion(cita.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="form-button secondary"
                      onClick={() => rechazarReprogramacion(cita.id)}
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {/* Botón para confirmar cita pendiente */}
                {cita.estado === "pendiente" && (
                  <div className="cita-actions" style={{ marginTop: "1rem" }}>
                    <button
                      className="form-button primary"
                      onClick={() => confirmarCita(cita.id)}
                    >
                      Confirmar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
