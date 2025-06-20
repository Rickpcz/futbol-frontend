import api from './api';
import type { Partido } from '../types/Partido';
import type { PartidoDetalle } from '../types/PartidoDetalle';

export const obtenerPartidos = async (): Promise<Partido[]> => {
  const res = await api.get('/partidos');
  return res.data;
};

export const obtenerPartidoPorId = async (id: number): Promise<Partido> => {
  const res = await api.get(`/partidos/${id}`);
  return res.data;
};

export const obtenerPartidosPorFecha = async (fecha: string): Promise<Partido[]> => {
  const res = await api.get(`/partidos/por-fecha/${fecha}`);
  return res.data;
};

export const obtenerPartidosPorEstado = async (estado: string): Promise<Partido[]> => {
  const res = await api.get(`/partidos/estado/${estado}`);
  return res.data;
};

export const obtenerPartidosPorLiga = async (ligaId: number, season: string): Promise<Partido[]> => {
  const res = await api.get(`/partidos/por-liga/${ligaId}/${season}`);
  return res.data;
};

export const obtenerDetallePartido = async (fixtureId: number): Promise<PartidoDetalle> => {
  const res = await api.get(`/partidos/detalle/${fixtureId}`);
  return res.data;
};