import React from "react";
import { useCitas } from "../hooks/useCitas";

export default function ListaCitas({ citas }) {
  const { solicitarReprogramacion } = useCitas();

  const handleReprogramar = (id) => {
    const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD):");
    const nuevaHora = prompt("Nueva hora (HH:MM):");
    if (nuevaFecha && nuevaHora) {
      solicitarReprogramacion(id, nuevaFecha, nuevaHora);
      alert("Solicitud de reprogramación enviada.");
    }
  };

  if (!citas || citas.length === 0) {
    return <p>No hay citas para mostrar.</p>;
  }

  return (
    <div className="citas-grid">
      {citas.map((cita) => (
        <div key={cita.id} className="cita-card">
          <div className="cita-content">
            <h3 className="cita-title">🧑 Paciente: {cita.paciente}</h3>

            {/* Información de contacto */}
            <div className="cita-contacto" style={{ marginBottom: "0.5rem" }}>
              <div>📞 <strong>Teléfono:</strong> {cita.telefono}</div>
              {cita.email && (
                <div>📧 <strong>Email:</strong> {cita.email}</div>
              )}
            </div>

            <div className="cita-meta">
              <span className="cita-fecha">📅 {cita.fecha}</span>
              <span className="cita-hora">⏰ {cita.hora}</span>
              <span className="cita-estado">
                {cita.estado === "confirmada" && "✅ Confirmada"}
                {cita.estado === "solicitud_reprogramacion" && "🟡 Pendiente de aprobación"}
                {cita.estado === "pendiente" && "⏳ Pendiente"}
              </span>
            </div>

            {cita.motivo && (
              <div className="cita-motivo">
                <strong>Motivo:</strong> {cita.motivo}
              </div>
            )}

            <div className="cita-actions">
              <button
                className="secondary-button"
                onClick={() => handleReprogramar(cita.id)}
              >
                Reprogramar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
