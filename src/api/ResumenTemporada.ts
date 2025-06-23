import api from "./api";
import type { ResumenTemporada } from "../types/ResumenTemporada";

export const obtenerResumenTemporada = async (
  ligaId: number,
  temporada: number
): Promise<ResumenTemporada> => {
  const res = await api.get(`/estadistica/resumen-temporada?ligaId=${ligaId}&temporada=${temporada}`);
  return res.data;
};
