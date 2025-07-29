import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import {collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";

export const CitasContext = createContext();

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [cuposMaximos] = useState(10);

  useEffect(() => {
    // Escucha en tiempo real todos los cambios en la colección "citas"
    const q = query(collection(db, "citas"), orderBy("fecha", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCitas(data);
    });

    return () => unsubscribe();
  }, []);

  // Agregar una nueva cita
  const addCita = async (nueva) => {
    try {
      const nuevaCita = { ...nueva, estado: nueva.estado || "confirmada" };
      await addDoc(collection(db, "citas"), nuevaCita);
    } catch (error) {
      console.error("Error al agregar cita:", error);
    }
  };

  // Solicitar reprogramación
  const solicitarReprogramacion = async (id, nuevaFecha, nuevaHora) => {
    try {
      const ref = doc(db, "citas", id);
      await updateDoc(ref, {
        estado: "solicitud_reprogramacion",
        fecha: nuevaFecha,
        hora: nuevaHora,
      });
    } catch (error) {
      console.error("Error al solicitar reprogramación:", error);
    }
  };

  // Aprobar reprogramación
  const aprobarReprogramacion = async (id) => {
    try {
      const ref = doc(db, "citas", id);
      await updateDoc(ref, { estado: "confirmada" });
    } catch (error) {
      console.error("Error al aprobar reprogramación:", error);
    }
  };

  // Rechazar reprogramación
  const rechazarReprogramacion = async (id) => {
    try {
      const ref = doc(db, "citas", id);
      await updateDoc(ref, { estado: "confirmada" });
    } catch (error) {
      console.error("Error al rechazar reprogramación:", error);
    }
  };

  const confirmarCita = async (id) => {
    try {
      const citaRef = doc(db, "citas", id);
      await updateDoc(citaRef, { estado: "confirmada" });
    } catch (error) {
      console.error("Error al confirmar cita:", error);
    }
  };

  return (
    <CitasContext.Provider
      value={{
        citas,
        cuposMaximos,
        addCita,
        confirmarCita,
        solicitarReprogramacion,
        aprobarReprogramacion,
        rechazarReprogramacion,
      }}
    >
      {children}
    </CitasContext.Provider>
  );
}
