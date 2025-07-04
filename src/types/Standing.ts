import type { Key, ReactNode } from "react";

export interface Standing {
  equipo: Key | null | undefined;
  diferenciaGoles: ReactNode;
  posicion: number;
  nombreEquipo: string;
  logo: string;
  puntos: number;
  partidosJugados: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  golesFavor: number;
  golesContra: number;
  grupo: string;
}
