import api from './api';
import type { Liga } from '../types/Liga';

export const obtenerLigas = async (): Promise<Liga[]> => {
  const res = await api.get('/ligas');
  return res.data;
};

export const obtenerLigasPorPais = async (pais: string): Promise<Liga[]> => {
  const res = await api.get(`/ligas/pais/${pais}`);
  return res.data;
};

export const obtenerLigasPorTipo = async (tipo: string): Promise<Liga[]> => {
  const res = await api.get(`/ligas/tipo/${tipo}`);
  return res.data;
};

export const obtenerLigaPorId = async (id: number): Promise<Liga> => {
  const res = await api.get(`/ligas/${id}`);
  return res.data;
};

export const obtenerEquiposDeLiga = async (id: number) => {
  const res = await api.get(`/ligas/${id}/equipos`);
  return res.data;
};
