import { useContext } from "react";
import { CitasContext } from "../context/CitasContext";

export function useCitas() {
  const context = useContext(CitasContext);
  if (!context) throw new Error("useCitas debe usarse dentro de CitasProvider");
  return context;
}
