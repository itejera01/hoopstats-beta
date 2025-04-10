import './global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  try {
    const response = await db.execAsync(
      `CREATE TABLE
        IF NOT EXISTS Torneo(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
       );
       CREATE TABLE
        IF NOT EXISTS Equipo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
       );
       CREATE TABLE
         IF NOT EXISTS Equipo_Torneo (
           equipo INTEGER,
           torneo INTEGER,
           PRIMARY KEY (equipo, torneo),
           FOREIGN KEY (equipo) REFERENCES Equipo (id),
           FOREIGN KEY (torneo) REFERENCES Torneo (id)
       );
       CREATE TABLE
  IF NOT EXISTS Jugador (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    posicion TEXT NOT NULL,
    equipo INTEGER NOT NULL,
    torneo INTEGER NOT NULL,
    FOREIGN KEY (equipo, torneo) REFERENCES Equipo_Torneo (equipo, torneo)
  );

CREATE TABLE
  IF NOT EXISTS Partidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jugador INTEGER NOT NULL,
    equipoJugador INTEGER NOT NULL,
    equipoRival INTEGER NOT NULL,
    torneo INTEGER NOT NULL,
    equipoLocal INTEGER NOT NULL,
    fecha DATE NOT NULL,
    inicio TIME NOT NULL,
    jugado INTEGER DEFAULT 0,
    FOREIGN KEY (jugador) REFERENCES Jugador (id),
    FOREIGN KEY (equipoJugador) REFERENCES Equipo (id),
    FOREIGN KEY (torneo) REFERENCES Torneo (id),
    FOREIGN KEY (equipoRival) REFERENCES Equipo (id),
    FOREIGN KEY (equipoLocal) REFERENCES Equipo (id)
  );

CREATE TABLE
  IF NOT EXISTS Estadisticas_Jugador_Partido (
    partido INTEGER NOT NULL,
    jugador INTEGER NOT NULL,
    puntos_equipo_jugador INTEGER DEFAULT 0,
    puntos_equipo_rival INTEGER DEFAULT 0,
    puntos INTEGER DEFAULT 0,
    asistencias INTEGER DEFAULT 0,
    rebotes INTEGER DEFAULT 0,
    robos INTEGER DEFAULT 0,
    bloqueos INTEGER DEFAULT 0,
    perdidas INTEGER DEFAULT 0,
    faltas INTEGER DEFAULT 0,
    minutos_jugados INTEGER DEFAULT 0,
    dobles_embocados INTEGER DEFAULT 0,
    dobles_intentados INTEGER DEFAULT 0,
    tiros_libres_intentados INTEGER DEFAULT 0,
    tiros_libres_embocados INTEGER DEFAULT 0,
    triples_intentados INTEGER DEFAULT 0,
    triples_embocados INTEGER DEFAULT 0,
    PRIMARY KEY (partido, jugador),
    FOREIGN KEY (partido) REFERENCES Partidos (id),
    FOREIGN KEY (jugador) REFERENCES Jugador (id)
  );
  CREATE TABLE
  IF NOT EXISTS Estadisticas_Jugador (
    jugador INTEGER NOT NULL,
    puntos_totales INTEGER DEFAULT 0,
    asistencias_totales INTEGER DEFAULT 0,
    rebotes_totales INTEGER DEFAULT 0,
    robos_totales INTEGER DEFAULT 0,
    bloqueos_totales INTEGER DEFAULT 0,
    perdidas_totales INTEGER DEFAULT 0,
    faltas_totales INTEGER DEFAULT 0,
    minutos_totales INTEGER DEFAULT 0,
    puntos_por_partido REAL DEFAULT 0,
    asistencias_por_partido REAL DEFAULT 0,
    rebotes_por_partido REAL DEFAULT 0,
    robos_por_partido REAL DEFAULT 0,
    bloqueos_por_partido REAL DEFAULT 0,
    perdidas_por_partido REAL DEFAULT 0,
    faltas_por_partido REAL DEFAULT 0,
    minutos_por_partido REAL DEFAULT 0,
    PRIMARY KEY (jugador),
    FOREIGN KEY (jugador) REFERENCES Jugador (id)
  );
      `
    );
    const tablas = await db.getAllAsync(
      `SELECT name, sql FROM sqlite_master WHERE type='table'`
    )
    console.log(tablas)
  } catch (error) {
    console.error(error);
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
    Oswald: require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
  });
  if (!loaded) return null;
  return (
    <>
      <SQLiteProvider databaseName='hoopStat.db' onInit={createDbIfNeeded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
          <Stack.Screen name="settings" options={{ presentation: 'modal' }}/>
        </Stack>
      </SQLiteProvider>
    </>
  );
}

