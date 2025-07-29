// src/services/citasService.js
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const citasCollection = collection(db, "citas");

// Obtener todas las citas
export async function obtenerCitas() {
  const snapshot = await getDocs(citasCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Agregar una cita
export async function agregarCita(cita) {
  // Estado por defecto
  const nueva = { ...cita, estado: "confirmada" };
  const docRef = await addDoc(citasCollection, nueva);
  return { id: docRef.id, ...nueva };
}

// Solicitar reprogramación
export async function solicitarReprogramacion(id, nuevaFecha, nuevaHora) {
  const ref = doc(db, "citas", id);
  await updateDoc(ref, {
    estado: "solicitud_reprogramacion",
    fecha: nuevaFecha,
    hora: nuevaHora,
  });
}

// Aprobar o rechazar reprogramación
export async function cambiarEstado(id, nuevoEstado = "confirmada") {
  const ref = doc(db, "citas", id);
  await updateDoc(ref, { estado: nuevoEstado });
}