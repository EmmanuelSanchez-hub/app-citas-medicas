import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario";
import DisponibilidadDia from "../components/DisponibilidadDia";
import { useCitas } from "../hooks/useCitas";
import ListaCitas from "../components/ListaCitas";

export default function Citas() {
  const navigate = useNavigate();
  const { citas } = useCitas();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Filtrar citas por fecha seleccionada
  const citasDelDia = citas.filter((c) => c.fecha === fechaSeleccionada);

  const handleSelectDate = (date) => {
    const fechaISO = date.toISOString().split("T")[0];
    setFechaSeleccionada(fechaISO);
  };

  return (
    <div className="citas-page">
      <div className="page-header">
        <h1 className="page-title">📅 Agenda de Citas</h1>
        <p className="page-subtitle">
          Selecciona un día para ver disponibilidad y agendar nuevas citas.
        </p>
      </div>

      {/* Calendario y disponibilidad */}
      <div style={{ marginBottom: "2rem" }}>
        <Calendario onSelect={handleSelectDate} />
      </div>

      <DisponibilidadDia fecha={fechaSeleccionada} />

      <div style={{ margin: "2rem 0" }}>
        <button
          className="form-button primary"
          onClick={() => navigate("/crear-cita")}
        >
          ➕ Reservar cita en {fechaSeleccionada}
        </button>
      </div>

      <h2 className="section-title">Citas para {fechaSeleccionada}</h2>
      <ListaCitas citas={citasDelDia} />
    </div>
  );
}
