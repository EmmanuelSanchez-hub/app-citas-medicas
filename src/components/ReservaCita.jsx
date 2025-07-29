import { useState } from "react";
import { useCitas } from "../hooks/useCitas";

export default function ReservaCita() {
  const { addCita } = useCitas();
  const [paciente, setPaciente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCita({ paciente, fecha, hora, motivo });
    alert("Cita reservada");
    setPaciente("");
    setFecha("");
    setHora("");
    setMotivo("");
  };

  return (
    <div className="recipe-form">
      <h3 className="form-section-title">Reservar nueva cita</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Paciente</label>
          <input className="form-input" value={paciente} onChange={(e) => setPaciente(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-input" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hora</label>
            <input type="time" className="form-input" value={hora} onChange={(e) => setHora(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Motivo</label>
          <textarea className="form-textarea" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button primary">Reservar</button>
        </div>
      </form>
    </div>
  );
}