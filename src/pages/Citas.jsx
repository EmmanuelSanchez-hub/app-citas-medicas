import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario";
import DisponibilidadDia from "../components/DisponibilidadDia";
import { useCitas } from "../hooks/useCitas";
import ListaCitas from "../components/ListaCitas";

export default function Citas() {
  const navigate = useNavigate();
  const { citas, cuposMaximos } = useCitas();

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [busqueda, setBusqueda] = useState(""); // filtro por paciente
  const [mesFiltro, setMesFiltro] = useState(""); // filtro por mes (YYYY-MM)

  // Filtro principal: parte siempre de todas las citas
  let citasFiltradas = [...citas];

  // Si hay un mes seleccionado, filtra por mes
  if (mesFiltro) {
    citasFiltradas = citasFiltradas.filter((c) =>
      c.fecha.startsWith(mesFiltro)
    );
  }

  // Filtro por nombre de paciente
  if (busqueda.trim()) {
    citasFiltradas = citasFiltradas.filter((c) =>
      c.paciente.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  const handleSelectDate = (date) => {
    const fechaISO = date.toISOString().split("T")[0];
    setFechaSeleccionada(fechaISO);
  };

  return (
    <div className="citas-page">
      <div className="page-header">
        <h1 className="page-title">📅 Agenda de Citas</h1>
        <p className="page-subtitle">
          Puedes filtrar por mes o por paciente para encontrar las citas.
        </p>
      </div>

      {/* Calendario y disponibilidad */}
      <div style={{ marginBottom: "2rem" }}>
        <Calendario onSelect={handleSelectDate} />
      </div>

      {/* La disponibilidad solo depende del día seleccionado */}
      <DisponibilidadDia fecha={fechaSeleccionada} />

      <div style={{ margin: "2rem 0" }}>
        <button
          className="form-button primary"
          onClick={() =>
            navigate("/crear-citas", { state: { fecha: fechaSeleccionada } })
          }
        >
          ➕ Reservar cita en {fechaSeleccionada}
        </button>
      </div>

      <h2 className="section-title">Todas las Citas</h2>

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

      {/* Lista de citas filtradas */}
      <ListaCitas citas={citasFiltradas} />
    </div>
  );
}
