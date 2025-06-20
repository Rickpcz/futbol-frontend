export interface PartidoDetalle {
  fixtureId: number;
  alineaciones: Alineacion[];
  estadisticas: Estadistica[];
  eventos: Evento[];
}

export interface Alineacion {
  equipo: string;
  formacion: string;
  jugadores: {
    nombre: string;
    numero: number;
    posicion: string;
  }[];
}

export interface Estadistica {
  equipo: string;
  estadisticas: {
    tipo: string;
    valor: string | number;
  }[];
}

export interface Evento {
  minuto: number;
  tipo: string;
  descripcion: string;
  jugador: string;
  equipo: string;
}
