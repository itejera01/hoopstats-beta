import { useSQLiteContext } from "expo-sqlite";
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, Text, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import EquiposDropDownComponent from '@/components/equiposDropDownComponent';
import TorneosDropDownComponent from '@/components/torneosDropDownComponent';
import TitleComponent from '@/components/titleComponent';
import JugadorComponent from '@/components/jugadorComponent';

interface Posicion {
  label: string;
  value: string;
}

type Equipo = {
  id: number,
  nombre: string,
}
type Torneo = {
  id: number,
  nombre: string,
}

export default function Jugador() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [torneo, setTorneo] = useState<Torneo | null>(null);
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [posiblesEquipos, setPosiblesEquipos] = useState<Equipo[]>([]);
  const [posiblesTorneos, setPosiblesTorneos] = useState<Torneo[]>([]);
  const [modalCrearJugador, setModalCrearJugador] = useState(false);
  const posiciones: Posicion[] = [
    { label: 'BA', value: 'Base' },
    { label: 'ES', value: 'Escolta' },
    { label: 'AL', value: 'Alero' },
    { label: 'AP', value: 'Ala-Pivot' },
    { label: 'P', value: 'Pivot' },
  ];
  const [posicion, setPosicion] = useState<Posicion | null>(null);

  const db = useSQLiteContext();

  const loadData = async () => {
    const jugadoresResult = await db.getFirstAsync<{
      id: number;
      nombre: string;
      edad: number;
      posicion: string;
      equipo: number;
      torneo: number;
      equipo_nombre: string;
      torneo_nombre: string;
    }>(`
      SELECT 
        Jugador.id,
        Jugador.nombre,
        Jugador.edad,
        Jugador.posicion,
        Jugador.equipo,
        Jugador.torneo,
        Equipo.nombre AS equipo_nombre,
        Torneo.nombre AS torneo_nombre
      FROM Jugador
      INNER JOIN Equipo ON Jugador.equipo = Equipo.id
      INNER JOIN Torneo ON Jugador.torneo = Torneo.id
    `);

    console.log(jugadoresResult);

    if (jugadoresResult) {
      setNombre(jugadoresResult.nombre);
      setEdad(jugadoresResult.edad);

      const nuevaPosicion = posiciones.find(p => p.value === jugadoresResult.posicion) || null;
      setPosicion({
        label: nuevaPosicion.label,
        value: nuevaPosicion.value
      });

      setEquipo({
        id: jugadoresResult.equipo,
        nombre: jugadoresResult.equipo_nombre
      });
      setTorneo({
        id: jugadoresResult.torneo,
        nombre: jugadoresResult.torneo_nombre
      });

      setJugadores(prevJugadores => [
        ...prevJugadores,
        {
          id: jugadoresResult.id,
          nombre: jugadoresResult.nombre,
          edad: jugadoresResult.edad,
          posicion: nuevaPosicion?.value,
          equipo: {
            id: jugadoresResult.equipo,
            nombre: jugadoresResult.equipo_nombre
          },
          torneo: {
            id: jugadoresResult.torneo,
            nombre: jugadoresResult.torneo_nombre
          }
        }
      ]);
    }

    const equiposResult = await db.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Equipo");
    setPosiblesEquipos(equiposResult);
    const torneosResult = await db.getAllAsync<{ id: number, nombre: string }>("SELECT * FROM Torneo");
    setPosiblesTorneos(torneosResult);
  };

  useEffect(() => {
    try {
      loadData();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const fetchPosiblesTorneos = async () => {
      try {
        const torneosHabilitados = await db.getAllAsync<{ id: number, nombre: string }>(`
          SELECT Torneo.id AS id, Torneo.nombre 
          FROM Equipo_Torneo
          INNER JOIN Torneo ON Equipo_Torneo.Torneo = Torneo.id
          WHERE Equipo_Torneo.Equipo = ?`,
          [equipo?.id]
        );
        setPosiblesTorneos(torneosHabilitados);
      } catch (error) {
        console.error("Error al obtener los torneos habilitados:", error);
      }
    };

    if (equipo && equipo.id !== 0) {
      fetchPosiblesTorneos();
    }
  }, [equipo]);

  const agregarJugador = async () => {
    if (nombre === '' || equipo?.id === 0 || edad === 0 || torneo?.id === 0 || posicion === null) {
      alert('Por favor complete todos los campos.');
      return;
    }
    const jugador = {
      nombre,
      edad,
      posicion: posicion?.value,
      equipo: equipo?.id,
      torneo: torneo?.id,
    };
    const response = await db.runAsync(
      "INSERT INTO Jugador (nombre, edad, posicion, equipo, torneo) VALUES (?, ?, ?, ?, ?)",
      [jugador.nombre, jugador.edad, jugador.posicion, jugador.equipo, jugador.torneo]
    );
    console.log(response);
    setJugadores([...jugadores, jugador]);
    setNombre('');
    setEdad(0);
    setEquipo(null);
    setTorneo(null);
    setModalCrearJugador(!modalCrearJugador);
  };

  const toggleModalCrearJugador = () => setModalCrearJugador(!modalCrearJugador);


  const cancelarCreacionJugador = () => {
    setNombre('');
    setEdad(0);
    setEquipo(null);
    setTorneo(null);
    setModalCrearJugador(!modalCrearJugador);
  };

  return (
    <>
      <TitleComponent title="Jugador" />
      <View style={styles.main}>
        <ScrollView>
          {jugadores.length > 0 ? (
            jugadores.map((jugador) => (
              <JugadorComponent
                key={jugador.id}
                nombre={jugador.nombre}
                edad={jugador.edad}
                posicion={jugador.posicion}
                equipo={jugador.equipo?.nombre}
                torneo={jugador.torneo?.nombre}
              />
            ))
          ) : (
            <Text style={{ color: Colors.text }}>No hay jugadores creados.</Text>
          )}
        </ScrollView>
        <Modal visible={modalCrearJugador} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el Nombre del Jugador"
                placeholderTextColor={Colors.text}
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Ingrese la Edad del Jugador"
                placeholderTextColor={Colors.text}
                value={edad > 0 ? String(edad) : ''}
                onChangeText={(text) => setEdad(Number(text))}
                keyboardType="numeric"
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.posicion}>
                  {posiciones.map((pos) => (
                    <TouchableOpacity
                      key={pos.value}
                      style={styles.checkbox}
                      onPress={() => setPosicion(pos)}
                    >
                      <Text style={[styles.text, posicion?.value === pos.value && { color: Colors.selected }]}>
                        {pos.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.input, styles.dropdownContainer]}>
                <EquiposDropDownComponent
                  placeholder="Selecciona el Equipo del Jugador"
                  data={posiblesEquipos}
                  onSelect={(item) => setEquipo(item)}
                />
              </View>
              {equipo?.id !== null && equipo?.id !== 0 && (
                <View style={[styles.input, styles.dropdownContainer]}>
                  <TorneosDropDownComponent
                    placeholder="Selecciona el Torneo del Jugador"
                    data={posiblesTorneos}
                    onSelect={(item) => setTorneo(item)}
                  />
                </View>
              )}
              <View style={styles.botones}>
                <TouchableOpacity
                  style={[styles.inputButton, { backgroundColor: Colors.barDownBackground }]}
                  onPress={() => cancelarCreacionJugador()}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => agregarJugador()}
                >
                  <Text style={styles.buttonText}>Crear jugador</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View >
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => toggleModalCrearJugador()}
      >
        <Text style={styles.helpButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appBackground,
    paddingHorizontal: 20, // Agrega un poco de espacio lateral
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    maxWidth: 400, // Limita el ancho máximo para pantallas grandes
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.menuBackground,
    padding: 20, // Agrega espacio interno
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20, // Espacio debajo del logo
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15, // Reduce el espacio entre inputs
    borderBottomWidth: 1, // Haz la línea más delgada
    borderColor: Colors.barDownBackground,
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 10, // Espacio interno
  },
  dropdownInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaciado uniforme entre botones
    marginTop: 20, // Espacio superior
    width: '100%',
  },
  inputButton: {
    flex: 1, // Los botones ocupan el mismo espacio
    height: 50,
    backgroundColor: Colors.selected,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5, // Espacio entre botones
  },
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  posicion: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.barDownBackground,
    color: Colors.text,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    height: 50,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.menuBackground,
    width: 75,
    height: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
  dropdown: {
    maxHeight: 150,
    backgroundColor: Colors.menuBackground,
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.barDownBackground,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text,
  },
});