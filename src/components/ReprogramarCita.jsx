import { useState } from "react";
import { useCitas } from "../hooks/useCitas";

export default function ReprogramarCita({ cita, onClose }) {
  const { solicitarReprogramacion } = useCitas();
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nuevaFecha || !nuevaHora) {
      alert("Debes seleccionar una nueva fecha y hora.");
      return;
    }

    // Llama al context para enviar la solicitud de reprogramación
    solicitarReprogramacion(cita.id, nuevaFecha, nuevaHora);

    alert("Solicitud de reprogramación enviada. Pendiente de aprobación del doctor.");
    onClose(); // Cierra el modal o panel
  };

  return (
    <div className="recipe-form" style={{ marginTop: "1rem" }}>
      <h3 className="form-section-title">Reprogramar Cita</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nuevaFecha" className="form-label">
            Nueva fecha
          </label>
          <input
            id="nuevaFecha"
            type="date"
            className="form-input"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nuevaHora" className="form-label">
            Nueva hora
          </label>
          <input
            id="nuevaHora"
            type="time"
            className="form-input"
            value={nuevaHora}
            onChange={(e) => setNuevaHora(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="form-button secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="form-button primary"
          >
            Enviar solicitud
          </button>
        </div>
      </form>
    </div>
  );
}

