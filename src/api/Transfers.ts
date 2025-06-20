import api from "./api";
import type { Fichaje } from "../types/Fichaje";

export const obtenerFichajesRecientes = async (): Promise<Fichaje[]> => {
  const res = await api.get("/transferencias/recientes");
  return res.data;
};
