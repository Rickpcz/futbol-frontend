export interface PartidoExterno {
  idEvento: string;
  local: string;
  visitante: string;
  logoLocal: string;
  logoVisitante: string;
  golesLocal: number | null;
  golesVisitante: number | null;
  hora: string;
  estado: string;
  liga: string;
  ligaLogo: string;
}
