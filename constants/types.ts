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
  jugador: Jugador,
  equipoJugador: Equipo,
  equipoRival: Equipo,
  equipoLocal: Equipo,
  torneo: Torneo,
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