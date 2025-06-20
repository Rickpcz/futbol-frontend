export interface Partido {
  id: number;
  equipoLocal: string;
  equipoVisitante: string;
  golesLocal: number | null;
  golesVisitante: number | null;
  fecha: string;
  estado?: string;
  ligaId?: number;
}