export interface Jugador{
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  equipo: number;
  torneo: number;
}

export interface Torneo{
  id: number;
  nombre: string;
}

export interface Equipo{
  id: number;
  nombre: string;
}