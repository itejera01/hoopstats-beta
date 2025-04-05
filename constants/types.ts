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

export type Estadisticas_Partido = {
  partido : number;
  jugador : number;
  puntos_equipo_jugador : number;
  puntos_equipo_rival : number;
  puntos : number;
  asistencias : number;
  rebotes : number;
  robos : number;
  bloqueos : number;
  perdidas : number;
  faltas : number;
  minutos_jugados : number;
  dobles_embocados : number;
  dobles_intentados : number;
  tiros_libres_intentados : number;
  tiros_libres_embocados : number;
  triples_intentados: number;
  triples_embocados: number;
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