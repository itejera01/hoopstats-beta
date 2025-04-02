import { Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from "react-native-safe-area-context";
import EquiposDropDownComponent from "@/components/equiposDropDownComponent";
import TorneosDropDownComponent from "@/components/torneosDropDownComponent";

type Equipo = {
  id: number;
  nombre: string;
};
type Torneo = {
  id: number;
  nombre: string;
};

export default function settingsModal() {
  const database = useSQLiteContext();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [equiposCargados, setEquiposCargados] = useState(false);
  const [torneosCargados, setTorneosCargados] = useState(false);

  useEffect(() => {
    const cargarData = async () => {
      try {
        const equiposDatabase = await database.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Equipo");
        console.log(equiposDatabase)
        if (equiposDatabase && equiposDatabase.length > 0) {
          setEquipos(equiposDatabase)
          setEquiposCargados(!equiposCargados)
        }
        const torneosDatabase = await database.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Torneo");
        console.log(torneosDatabase)
        if (torneosDatabase && torneosDatabase.length > 0) {
          setTorneos(torneosDatabase)
          setTorneosCargados(!torneosCargados)
        }
        const equipoTorneoDatabase = await database.getAllAsync<{ equipo: number, torneo: number }>("SELECT * FROM Equipo_Torneo");
        console.log(equipoTorneoDatabase)

      } catch (error) {
        console.log(error);
      }
    }
    cargarData();
  }, [database])

  const cargarEquipos = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO
        Equipo (id,nombre)
        VALUES
        (1,'25 de Agosto'),
        (2,'Aguada'),
        (3,'Albatros'),
        (4,'Atenas'),
        (5,'Ateneo (maldonado)'),
        (6,'Auriblanco'),
        (7,'Bigua'),
        (8,'Bohemios'),
        (9,'Capitol'),
        (10,'Capurro'),
        (11,'Cordon'),
        (12,'Colon F.C.'),
        (13,'Country El Pinar'),
        (14,'Defensor Sporting'),
        (15,'Defensores de Maroñas'),
        (16,'Deportivo Maldonado'),
        (17,'Deportivo de la Costa'),
        (18,'Goes'),
        (19,'Hebraica y Macabi'),
        (20,'Juventud'),
        (21,'Lagomar'),
        (22,'Larrañaga'),
        (23,'Larre Borges'),
        (24,'Layva'),
        (25,'Malvin'),
        (26,'Marne'),
        (27,'Miramar'),
        (28,'Montevideo BBC'),
        (29,'Nacional'),
        (30,'Nautico'),
        (31,'Olimpia'),
        (32,'Olivol Mundial'),
        (33,'Peñarol'),
        (34,'Plaza Helvetico'),
        (35,'Reducto'),
        (36,'San Telmo - Rapido Sport'),
        (37,'Sayago'),
        (38,'Stockolmo'),
        (39,'Tabare'),
        (40,'Trouville'),
        (41,'Union Atletica'),
        (42,'Urunday Universitario'),
        (43,'Urupan'),
        (44,'Verdirrojo'),
        (45,'Welcome'),
        (46,'Yale');`);
      console.log(response)
      const result = await database.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Equipo");
      console.log(result)
      setEquipos(result)
    } catch (error) {
      console.error(error);
    }
  }

  const borrarEquipos = async () => {
    try {
      await database.runAsync("DELETE FROM Equipo");
      console.log("Todos los equipos fueron eliminados.");
      setEquipos([]);
      setEquiposCargados(!equiposCargados)
    } catch (error) {
      console.error("Error al borrar equipos:", error);
    }
  };

  const cargarTorneos = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO
        Torneo (id,nombre)
        values
        (1,'U20 Masculino'),
        (2,'U19 Femenino'),
        (3,'U18 Masculino'),
        (4,'U16 Femenino'),
        (5,'U16 Masculino'),
        (6,'U14 Femenino'),
        (7,'U14 Mixto');`);
      console.log(response)
      const result = await database.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Torneo");
      console.log(result)
      setTorneos(result)
      const torneoEquipo = await database.runAsync(
        `
        INSERT INTO
  Equipo_Torneo (equipo, torneo)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (3, 1),
  (3, 3),
  (3, 5),
  (3, 7),
  (4, 1),
  (4, 3),
  (4, 5),
  (4, 6),
  (4, 7),
  (5, 4),
  (6, 1),
  (6, 3),
  (6, 5),
  (6, 7),
  (7, 1),
  (7, 2),
  (7, 3),
  (7, 4),
  (7, 5),
  (7, 6),
  (7, 7),
  (8, 1),
  (8, 3),
  (8, 5),
  (8, 6),
  (8, 7),
  (9, 1),
  (9, 3),
  (9, 5),
  (9, 7),
  (10, 3),
  (10, 5),
  (10, 7),
  (11, 1),
  (11, 3),
  (11, 4),
  (11, 5),
  (11, 6),
  (11, 7),
  (12, 1),
  (12, 3),
  (12, 5),
  (12, 6),
  (12, 7),
  (13, 1),
  (13, 3),
  (13, 5),
  (13, 7),
  (14, 1),
  (14, 2),
  (14, 3),
  (14, 4),
  (14, 5),
  (14, 6),
  (14, 7),
  (15, 1),
  (15, 2),
  (15, 3),
  (15, 5),
  (15, 6),
  (15, 7),
  (16, 1),
  (16, 3),
  (16, 5),
  (16, 7),
  (17, 3),
  (17, 5),
  (17, 7),
  (18, 1),
  (18, 3),
  (18, 5),
  (18, 7),
  (19, 1),
  (19, 2),
  (19, 3),
  (19, 5),
  (19, 7),
  (20, 1),
  (20, 2),
  (20, 3),
  (20, 4),
  (20, 5),
  (20, 6),
  (20, 7),
  (21, 1),
  (21, 3),
  (21, 4),
  (21, 5),
  (21, 6),
  (21, 7),
  (22, 1),
  (22, 3),
  (22, 4),
  (22, 5),
  (22, 6),
  (22, 7),
  (23, 1),
  (23, 3),
  (23, 5),
  (23, 7),
  (24, 1),
  (24, 2),
  (24, 3),
  (24, 4),
  (24, 5),
  (24, 6),
  (24, 7),
  (25, 1),
  (25, 3),
  (25, 4),
  (25, 5),
  (25, 6),
  (25, 7),
  (26, 1),
  (26, 3),
  (26, 5),
  (26, 7),
  (27, 1),
  (27, 3),
  (27, 5),
  (27, 7),
  (28, 1),
  (28, 3),
  (28, 5),
  (28, 7),
  (29, 1),
  (29, 3),
  (29, 4),
  (29, 5),
  (29, 6),
  (29, 7),
  (30, 1),
  (30, 3),
  (30, 5),
  (30, 7),
  (31, 1),
  (31, 3),
  (31, 4),
  (31, 5),
  (31, 6),
  (31, 7),
  (32, 1),
  (32, 2),
  (32, 3),
  (32, 4),
  (32, 5),
  (32, 6),
  (32, 7),
  (33, 1),
  (33, 3),
  (33, 5),
  (33, 7),
  (34, 1),
  (34, 3),
  (34, 5),
  (34, 7),
  (35, 1),
  (35, 3),
  (35, 5),
  (35, 7),
  (36, 1),
  (36, 3),
  (36, 5),
  (36, 7),
  (37, 1),
  (37, 3),
  (37, 4),
  (37, 5),
  (37, 6),
  (37, 7),
  (38, 1),
  (38, 2),
  (38, 3),
  (38, 4),
  (38, 5),
  (38, 6),
  (38, 7),
  (39, 1),
  (39, 3),
  (39, 5),
  (39, 7),
  (40, 1),
  (40, 3),
  (40, 5),
  (40, 7),
  (41, 1),
  (41, 3),
  (41, 5),
  (41, 7),
  (42, 1),
  (42, 3),
  (42, 5),
  (42, 7),
  (43, 1),
  (43, 3),
  (43, 5),
  (43, 7),
  (44, 1),
  (44, 3),
  (44, 5),
  (44, 7),
  (45, 1),
  (45, 2),
  (45, 3),
  (45, 4),
  (45, 5),
  (45, 6),
  (45, 7),
  (46, 1),
  (46, 3),
  (46, 5),
  (46, 7),
  (47, 1),
  (47, 3),
  (47, 5),
  (47, 7),
  (48, 1),
  (48, 3),
  (48, 5),
  (48, 7);
        `
      )
      console.log(torneoEquipo)
      setTorneosCargados(!torneosCargados)
    } catch (error) {
      console.error(error);
    }
  }

  const borrarTorneos = async () => {
    try {
      await database.runAsync("DELETE FROM Torneo");
      await database.runAsync("DELETE FROM Equipo_Torneo");
      console.log("Todos los torneos fueron eliminados.");
      setTorneos([]);
      setTorneosCargados(!torneosCargados)
    } catch (error) {
      console.error("Error al borrar torneos:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Configuración" }} />
      <View style={styles.textArea}>
        <Text style={{ color: Colors.text, fontSize: 16, }}>Hola, has entrado al apartado de configuración, debo destacar que normalmente.
          Esta ventana no se utiliza mucho en el diseño de la aplicación ya que debía encontrar una solución para tener
          los equipos y torneos ya cargados sin tener que crear la base de datos una y otra vez, en fin.
          PORFAVOR, No presione el botón de Eliminar. esto logrará que pueda acceder a los apartados de Verificación, si ve resultados,
          significa que los datos han sido cargados con éxito.
        </Text>

      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.menuBackground }]}
          onPress={equiposCargados ? null : cargarEquipos}>
          <Text style={styles.buttonText}>Ingresar Equipos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={borrarEquipos}>
          <Text style={styles.buttonText}>Eliminar Equipos</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.input]}>
        <EquiposDropDownComponent
          placeholder="Verificar Equipos"
          data={equipos}
          onSelect={(item) => console.log(item)}
        />

      </View>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.menuBackground }]}
          onPress={torneosCargados ? null : cargarTorneos}>
          <Text style={styles.buttonText}>Ingresar Torneos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={borrarTorneos}>
          <Text style={styles.buttonText}>Eliminar Torneos</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.input]}>
        <TorneosDropDownComponent
          placeholder="Verificar Torneos"
          data={torneos}
          onSelect={(item) => console.log(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.appBackground,
  },
  button: {
    height: 50,
    width: '40%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Colors.selected,
    margin: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15, // Reduce el espacio entre inputs
    borderBottomWidth: 1, // Haz la línea más delgada
    borderColor: Colors.menuBackground,
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 10, // Espacio interno
  },
  textArea: {
    backgroundColor: Colors.menuBackground,
    height: 'auto',
    width: '90%',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});