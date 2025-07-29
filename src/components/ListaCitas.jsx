import React, { useState } from "react";
import { useCitas } from "../hooks/useCitas";
import ReprogramarCita from "./ReprogramarCita";

export default function ListaCitas({ citas }) {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const { solicitarReprogramacion } = useCitas();

  if (!citas || citas.length === 0) {
    return <p>No hay citas para mostrar.</p>;
  }

  // Función para calcular hora fin sumando 30 minutos
  const calcularHoraFin = (horaInicio) => {
    const [h, m] = horaInicio.split(":").map(Number);
    const totalMin = h * 60 + m + 30; // suma 30 minutos
    const horasFin = Math.floor(totalMin / 60);
    const minutosFin = totalMin % 60;
    return `${String(horasFin).padStart(2, "0")}:${String(minutosFin).padStart(2, "0")}`;
  };

  return (
    <div className="citas-grid">
      {citas.map((cita) => (
        <div key={cita.id} className="cita-card">
          <div className="cita-content">
            <h3 className="cita-title">🧑 Paciente: {cita.paciente}</h3>

            {/* Información de contacto */}
            <div className="cita-contacto" style={{ marginBottom: "0.5rem" }}>
              <div>
                📞 <strong>Teléfono:</strong> {cita.telefono}
              </div>
              {cita.email && (
                <div>
                  📧 <strong>Email:</strong> {cita.email}
                </div>
              )}
            </div>

            <div className="cita-meta">
              <span className="cita-fecha">📅 {cita.fecha}</span>
              <span className="cita-hora">
                ⏰ {cita.hora} - {calcularHoraFin(cita.hora)}
              </span>
              <span className="cita-estado">
                {cita.estado === "confirmada" && "✅ Confirmada"}
                {cita.estado === "solicitud_reprogramacion" &&
                  "🟡 Pendiente de aprobación"}
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
                onClick={() => setCitaSeleccionada(cita)}
              >
                Reprogramar
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal para reprogramación */}
      {citaSeleccionada && (
        <div className="modal">
          <div className="modal-content">
            <ReprogramarCita
              cita={citaSeleccionada}
              onClose={() => setCitaSeleccionada(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
