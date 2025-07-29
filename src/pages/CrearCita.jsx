import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCitas } from "../hooks/useCitas";

export default function CrearCita() {
  const navigate = useNavigate();
  const location = useLocation();
  const fechaInicial = location.state?.fecha || "";
  const { addCita, citas } = useCitas();
  const nombreRef = useRef(null);

  const [formData, setFormData] = useState({
    paciente: "",
    telefono: "",
    email: "",
    fecha: fechaInicial,
    hora: "",
    motivo: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (nombreRef.current) {
      nombreRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.paciente.trim()) newErrors.paciente = "El nombre es obligatorio";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
    if (!formData.fecha) newErrors.fecha = "La fecha es obligatoria";
    if (!formData.hora) newErrors.hora = "La hora es obligatoria";
    if (!formData.motivo.trim()) newErrors.motivo = "El motivo es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Validación de conflicto (±30 min)
    const nuevaFecha = formData.fecha;
    const [h, m] = formData.hora.split(":").map(Number);
    const nuevaHoraMinutos = h * 60 + m;

    const conflicto = citas.some((cita) => {
      if (cita.fecha !== nuevaFecha) return false;
      const [hc, mc] = cita.hora.split(":").map(Number);
      const citaMinutos = hc * 60 + mc;
      const diff = Math.abs(nuevaHoraMinutos - citaMinutos);
      return diff < 30;
    });

    if (conflicto) {
      alert("Ya existe una cita en esa fecha y hora (dentro de 30 minutos).");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Estado de la cita: pendiente para confirmación
      addCita({
        paciente: formData.paciente,
        telefono: formData.telefono,
        email: formData.email,
        fecha: formData.fecha,
        hora: formData.hora,
        motivo: formData.motivo,
        estado: "pendiente",
      });

      alert("Cita registrada. Esperando confirmación del doctor.");
      navigate("/citas");
    } catch {
      alert("Hubo un error al crear la cita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-appointment-page">
      <div className="page-header">
        <h1 className="page-title">➕ Crear Nueva Cita</h1>
        <p className="page-subtitle">
          Reserva una cita odontológica completando la información
        </p>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-section">
          <h3 className="form-section-title">📝 Datos del Paciente</h3>

          <div className="form-group">
            <label htmlFor="paciente" className="form-label">
              Nombre del paciente *
            </label>
            <input
              ref={nombreRef}
              type="text"
              id="paciente"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              className={`form-input ${errors.paciente ? "error" : ""}`}
              placeholder="Ej. Juan Pérez"
            />
            {errors.paciente && (
              <span className="error-message">{errors.paciente}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="telefono" className="form-label">
              Teléfono de contacto *
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`form-input ${errors.telefono ? "error" : ""}`}
              placeholder="Ej. 987654321"
            />
            {errors.telefono && (
              <span className="error-message">{errors.telefono}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico (opcional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej. ejemplo@gmail.com"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha" className="form-label">
                Fecha *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className={`form-input ${errors.fecha ? "error" : ""}`}
              />
              {errors.fecha && (
                <span className="error-message">{errors.fecha}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="hora" className="form-label">
                Hora *
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className={`form-input ${errors.hora ? "error" : ""}`}
              />
              {errors.hora && (
                <span className="error-message">{errors.hora}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="motivo" className="form-label">
              Motivo / Descripción *
            </label>
            <textarea
              id="motivo"
              name="motivo"
              rows={4}
              value={formData.motivo}
              onChange={handleChange}
              className={`form-textarea ${errors.motivo ? "error" : ""}`}
              placeholder="Ej. Limpieza dental"
            />
            {errors.motivo && (
              <span className="error-message">{errors.motivo}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/citas")}
            className="form-button secondary"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="form-button primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "⏳ Creando..." : "✅ Crear Cita"}
          </button>
        </div>
      </form>
    </div>
  );
}
