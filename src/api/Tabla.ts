import api from "./api";
import type { Standing } from "../types/Standing";

export const obtenerTablaPorLigaYTemporada = async (
    ligaId: number,
    temporada: number
): Promise<Standing[]> => {
    const res = await api.get(`/ligas/${ligaId}/tabla/${temporada}`);
    return res.data;
};
