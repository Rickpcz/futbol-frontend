import api from './api';
import type { Equipo } from '../types/Equipo';
import type { Jugador } from '../types/Jugador';
import type { Partido } from '../types/Partido';
import type { RespuestaPaginada } from '../types/RespuestaPaginada';

export const obtenerEquipos = async (
  page = 1,
  pageSize = 20
): Promise<RespuestaPaginada<Equipo>> => {
  const res = await api.get(`/equipos?page=${page}&pageSize=${pageSize}`);
  return res.data;
};
export const obtenerEquipoPorId = async (id: number): Promise<Equipo> => {
  const res = await api.get(`/equipos/${id}`);
  return res.data;
};

export const obtenerEquiposPorLiga = async (ligaId: number): Promise<Equipo[]> => {
  const res = await api.get(`/equipos/por-liga/${ligaId}`);
  return res.data;
};

export const obtenerEquiposPorPais = async (pais: string): Promise<Equipo[]> => {
  const res = await api.get(`/equipos/por-pais/${pais}`);
  return res.data;
};

export const obtenerJugadoresDeEquipo = async (equipoId: number): Promise<Jugador[]> => {
  const res = await api.get(`/equipos/${equipoId}/jugadores`);
  return res.data;
};

export const obtenerPartidosDeEquipo = async (equipoId: number): Promise<Partido[]> => {
  const res = await api.get(`/equipos/${equipoId}/partidos`);
  return res.data;
};