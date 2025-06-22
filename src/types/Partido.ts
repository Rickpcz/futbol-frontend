export interface Partido {
  id: number;
  equipoLocalId: number;
  equipoVisitanteId: number;
  golesLocal: number | null;
  golesVisitante: number | null;
  fecha: string;
  estado?: string | { long?: string; short?: string; elapsed?: number };
  ligaId?: number;
}