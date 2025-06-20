import type { PartidoExterno } from "../types/PartidosExternos";
import api from "./api";

export const obtenerPartidosExternosPorFecha = async (fecha: string): Promise<PartidoExterno[]> => {
  const res = await api.get(`/partidos/externos?fecha=${fecha}`);
  return res.data;
};