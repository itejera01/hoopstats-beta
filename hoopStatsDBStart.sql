PRAGMA foreign_keys = ON;

CREATE TABLE
  Torneo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  );

INSERT INTO
  Torneo (nombre)
values
  ('U20 Masculino'),
  ('U19 Femenino'),
  ('U18 Masculino'),
  ('U16 Femenino'),
  ('U16 Masculino'),
  ('U14 Femenino'),
  ('U14 Mixto');

CREATE TABLE
  Equipo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  );

INSERT INTO
  Equipo (nombre)
VALUES
  ('25 de Agosto'),
  ('Aguada'),
  ('Albatros'),
  ('Atenas'),
  ('Ateneo (maldonado)'),
  ('Auriblanco'),
  ('Bigua'),
  ('Bohemios'),
  ('Capitol'),
  ('Capurro'),
  ('Cordon'),
  ('Colon F.C.'),
  ('Country El Pinar'),
  ('Defensor Sporting'),
  ('Defensores de Maroñas'),
  ('Deportivo Maldonado'),
  ('Deportivo de la Costa'),
  ('Goes'),
  ('Hebraica y Macabi'),
  ('Juventud'),
  ('Lagomar'),
  ('Larrañaga'),
  ('Larre Borges'),
  ('Layva'),
  ('Malvin'),
  ('Marne'),
  ('Miramar'),
  ('Montevideo BBC'),
  ('Nacional'),
  ('Nautico'),
  ('Olimpia'),
  ('Olivol Mundial'),
  ('Peñarol'),
  ('Plaza Helvetico'),
  ('Reducto'),
  ('San Telmo - Rapido Sport'),
  ('Sayago'),
  ('Stockolmo'),
  ('Tabare'),
  ('Trouville'),
  ('Union Atletica'),
  ('Urunday Universitario'),
  ('Urupan'),
  ('Verdirrojo'),
  ('Welcome'),
  ('Yale');

CREATE TABLE
  Equipo_Torneo (
    equipo INTEGER,
    torneo INTEGER,
    PRIMARY KEY (equipo, torneo),
    FOREIGN KEY (equipo) REFERENCES Equipo (id),
    FOREIGN KEY (torneo) REFERENCES Torneo (id)
  );

  INSERT INTO
    Equipo_Torneo (equipo, torneo)
  VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7),
    (3, 1), (3, 3), (3, 5), (3, 7),
    (4, 1), (4, 3), (4, 5), (4, 6), (4, 7),
    (5, 4),
    (6, 1), (6, 3), (6, 5), (6, 7),
    (7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7),
    (8, 1), (8, 3), (8, 5), (8, 6), (8, 7),
    (9, 1), (9, 3), (9, 5), (9, 7),
    (10, 3), (10, 5), (10, 7),
    (11, 1), (11, 3), (11, 4), (11, 5), (11, 6), (11, 7),
    (12, 1), (12, 3), (12, 5), (12, 6), (12, 7),
    (13, 1), (13, 3), (13, 5), (13, 7),
    (14, 1), (14, 2), (14, 3), (14, 4), (14, 5), (14, 6), (14, 7),
    (15, 1), (15, 2), (15, 3), (15, 5), (15, 6), (15, 7),
    (16, 1), (16, 3), (16, 5), (16, 7),
    (17, 3), (17, 5), (17, 7),
    (18, 1), (18, 3), (18, 5), (18, 7),
    (19, 1), (19, 2), (19, 3), (19, 5), (19, 7),
    (20, 1), (20, 2), (20, 3), (20, 4), (20, 5), (20, 6), (20, 7),
    (21, 1), (21, 3), (21, 4), (21, 5), (21, 6), (21, 7),
    (22, 1), (22, 3), (22, 4), (22, 5), (22, 6), (22, 7),
    (23, 1), (23, 3), (23, 5), (23, 7),
    (24, 1), (24, 2), (24, 3), (24, 4), (24, 5), (24, 6), (24, 7),
    (25, 1), (25, 3), (25, 4), (25, 5), (25, 6), (25, 7),
    (26, 1), (26, 3), (26, 5), (26, 7),
    (27, 1), (27, 3), (27, 5), (27, 7),
    (28, 1), (28, 3), (28, 5), (28, 7),
    (29, 1), (29, 3), (29, 4), (29, 5), (29, 6), (29, 7),
    (30, 1), (30, 3), (30, 5), (30, 7),
    (31, 1), (31, 3), (31, 4), (31, 5), (31, 6), (31, 7),
    (32, 1), (32, 2), (32, 3), (32, 4), (32, 5), (32, 6), (32, 7),
    (33, 1), (33, 3), (33, 5), (33, 7),
    (34, 1), (34, 3), (34, 5), (34, 7),
    (35, 1), (35, 3), (35, 5), (35, 7),
    (36, 1), (36, 3), (36, 5), (36, 7),
    (37, 1), (37, 3), (37, 4), (37, 5), (37, 6), (37, 7),
    (38, 1), (38, 2), (38, 3), (38, 4), (38, 5), (38, 6), (38, 7),
    (39, 1), (39, 3), (39, 5), (39, 7),
    (40, 1), (40, 3), (40, 5), (40, 7),
    (41, 1), (41, 3), (41, 5), (41, 7),
    (42, 1), (42, 3), (42, 5), (42, 7),
    (43, 1), (43, 3), (43, 5), (43, 7),
    (44, 1), (44, 3), (44, 5), (44, 7),
    (45, 1), (45, 2), (45, 3), (45, 4), (45, 5), (45, 6), (45, 7),
    (46, 1), (46, 3), (46, 5), (46, 7),
    (47, 1), (47, 3), (47, 5), (47, 7),
    (48, 1), (48, 3), (48, 5), (48, 7);

CREATE TABLE
  Jugador (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    equipo INTEGER NOT NULL,
    torneo INTEGER NOT NULL,
    FOREIGN KEY (equipo, torneo) REFERENCES Equipo_Torneo (equipo, torneo)
  );

CREATE TABLE
  Partidos (
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
  Estadisticas_Jugador_Partido (
    partido INTEGER NOT NULL,
    jugador INTEGER NOT NULL,
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

CREATE TRIGGER actualizar_puntos AFTER UPDATE ON Estadisticas_Jugador_Partido FOR EACH ROW BEGIN
  UPDATE Estadisticas_Jugador_Partido
  SET
    puntos = (NEW.dobles_embocados * 2) + NEW.tiros_libres_embocados + (NEW.triples_embocados * 3)
  WHERE
    partido = NEW.partido
    AND jugador = NEW.jugador;
END;

CREATE TABLE
  Estadisticas_Jugador (
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

CREATE TRIGGER actualizar_estadisticas_jugador AFTER UPDATE ON Estadisticas_Jugador_Partido FOR EACH ROW BEGIN
-- Update total statistics
UPDATE Estadisticas_Jugador
SET
  puntos_totales = puntos_totales + (
    (NEW.dobles_embocados * 2) + (NEW.triples_embocados * 3) + NEW.tiros_libres_embocados
  ) - COALESCE(
    (
      (OLD.dobles_embocados * 2) + (OLD.triples_embocados * 3) + OLD.tiros_libres_embocados
    ),
    0
  ),
  asistencias_totales = asistencias_totales + NEW.asistencias - COALESCE(OLD.asistencias, 0),
  rebotes_totales = rebotes_totales + NEW.rebotes - COALESCE(OLD.rebotes, 0),
  robos_totales = robos_totales + NEW.robos - COALESCE(OLD.robos, 0),
  bloqueos_totales = bloqueos_totales + NEW.bloqueos - COALESCE(OLD.bloqueos, 0),
  perdidas_totales = perdidas_totales + NEW.perdidas - COALESCE(OLD.perdidas, 0),
  faltas_totales = faltas_totales + NEW.faltas - COALESCE(OLD.faltas, 0),
  minutos_totales = minutos_totales + NEW.minutos_jugados - COALESCE(OLD.minutos_jugados, 0)
WHERE
  jugador = NEW.jugador;

-- Update per-game averages
UPDATE Estadisticas_Jugador
SET
  puntos_por_partido = CAST(puntos_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  asistencias_por_partido = CAST(asistencias_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  rebotes_por_partido = CAST(rebotes_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  robos_por_partido = CAST(robos_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  bloqueos_por_partido = CAST(bloqueos_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  perdidas_por_partido = CAST(perdidas_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  faltas_por_partido = CAST(faltas_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  ),
  minutos_por_partido = CAST(minutos_totales AS REAL) / (
    SELECT
      COUNT(*)
    FROM
      Estadisticas_Jugador_Partido
    WHERE
      jugador = NEW.jugador
  )
WHERE
  jugador = NEW.jugador;

END;