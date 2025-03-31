export type Jugador = {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  equipo: Equipo;
  torneo: Torneo;
}

export type Partido = {
  id: number,
  jugador: number,
  equipoJugador: number,
  equipoRival: number,
  equipoLocal: number,
  torneo: number,
  fecha: string,
  inicio: string,
  jugado: number,
}

export type Torneo = {
  id: number;
  nombre: string;
}

export type Equipo = {
  id: number;
  nombre: string;
}

export type Posicion = {
  label: string;
  value: string;
}