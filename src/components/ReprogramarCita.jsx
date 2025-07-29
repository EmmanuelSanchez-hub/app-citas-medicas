import { useState } from "react";
import { useCitas } from "../hooks/useCitas";

export default function ReprogramarCita({ cita, onClose }) {
  const { solicitarReprogramacion } = useCitas();
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    solicitarReprogramacion(cita.id, nuevaFecha, nuevaHora);
    alert("Solicitud de reprogramación enviada.");
    onClose();
  };

  return (
    <div className="recipe-form">
      <h3 className="form-section-title">Reprogramar Cita</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nueva fecha</label>
          <input type="date" className="form-input" value={nuevaFecha} onChange={(e) => setNuevaFecha(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Nueva hora</label>
          <input type="time" className="form-input" value={nuevaHora} onChange={(e) => setNuevaHora(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" className="form-button secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="form-button primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}
