import api from "./api";

export const obtenerFotoJugador = async (nombre: string): Promise<string | null> => {
  try {
    const res = await api.get(`/transferencias/foto-jugador/${encodeURIComponent(nombre)}`);
    return res.data.foto || null;
  } catch {
    return null;
  }
};
