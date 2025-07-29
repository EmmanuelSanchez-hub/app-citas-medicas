import { createContext, useState, useEffect } from "react";

export const CitasContext = createContext();

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [cuposMaximos] = useState(10);

  // Cargar citas de localStorage
  useEffect(() => {
    const guardadas = localStorage.getItem("citas");
    if (guardadas) setCitas(JSON.parse(guardadas));
  }, []);

  // Guardar citas en localStorage
  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const addCita = (nueva) => {
    const newId = citas.length ? Math.max(...citas.map(c => c.id)) + 1 : 1;
    const cita = { ...nueva, id: newId, estado: "confirmada" };
    setCitas((prev) => [...prev, cita]);
  };

  const solicitarReprogramacion = (id, nuevaFecha, nuevaHora) => {
    setCitas((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, estado: "solicitud_reprogramacion", fecha: nuevaFecha, hora: nuevaHora }
          : c
      )
    );
  };

  const aprobarReprogramacion = (id) => {
    setCitas((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, estado: "confirmada" } : c
      )
    );
  };

  const rechazarReprogramacion = (id) => {
    setCitas((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, estado: "confirmada" } : c
      )
    );
  };

  return (
    <CitasContext.Provider
      value={{
        citas,
        cuposMaximos,
        addCita,
        solicitarReprogramacion,
        aprobarReprogramacion,
        rechazarReprogramacion,
      }}
    >
      {children}
    </CitasContext.Provider>
  );
}
