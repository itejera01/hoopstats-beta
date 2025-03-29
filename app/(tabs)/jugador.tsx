import { useSQLiteContext } from "expo-sqlite";
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, Text, Image, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import EquiposDropDownComponent from '@/components/equiposDropDownComponent';
import TorneosDropDownComponent from '@/components/torneosDropDownComponent';
import TitleComponent from '@/components/titleComponent';
import JugadorComponent from '@/components/jugadorComponent';
import { useLocalSearchParams } from "expo-router";

interface Posicion {
  label: string;
  value: string;
}

export default function Jugador() {
  const { id } = useLocalSearchParams();
  const [nombre, setNombre] = useState('');
  const [equipo, setEquipo] = useState(0);
  const [edad, setEdad] = useState(0);
  const [torneo, setTorneo] = useState(0);
  const [jugadores, setJugadores] = useState([]);
  const [modalCrearJugador, setModalCrearJugador] = useState(false);

  const db = useSQLiteContext();

  const loadData = async () => {
    const result = await db.getFirstAsync<{
      id: number;
      nombre: string;
      edad: number;
      equipo: number;
      torneo: number;
    }>(`SELECT * FROM users WHERE id = ?`, [parseInt(id as string)]);
    setNombre(result?.nombre!);
    setEdad(result?.edad!);
    setEquipo(result?.equipo!);
    setTorneo(result?.torneo!);
  };
  /*

    const handleSave = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO jugadores (nombre, edad, equipo, torneo) VALUES (?, ?, ?, ?)`,
        [nombre, edad, equipo, torneo]
      );
      console.log("Item saved successfully:", response?.changes!);
      loadData();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await database.runAsync(
        `UPDATE users SET name = ?, email = ? WHERE id = ?`,
        [name, email, parseInt(id as string)]
      );
      console.log("Item updated successfully:", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  */

  // useEffect(() => {
  //   AsyncStorage.getItem('jugadores').then((value) => {
  //     if (value) {
  //       setJugadores(JSON.parse(value));
  //     }
  //   });
  // }, [jugadores])


  const agregarJugador = () => {
    if (nombre === '' || equipo === 0 || edad === 0 || torneo === 0 || posicion === null) {
      alert('Por favor complete todos los campos.');
      return;
    }
    const jugador = {
      nombre,
      equipo,
      edad,
      torneo,
      posicion: posicion?.value,
    };
    setJugadores([...jugadores, jugador]);
    setNombre('');
    setEquipo(0);
    setEdad(0);
    setTorneo(0);
    setModalCrearJugador(!modalCrearJugador);
    // AsyncStorage.setItem('jugadores', JSON.stringify([...jugadores, jugador]));
  };

  const toggleModalCrearJugador = () => setModalCrearJugador(!modalCrearJugador);

  const posiciones: Posicion[] = [
    { label: 'BA', value: 'Base' },
    { label: 'ES', value: 'Escolta' },
    { label: 'AL', value: 'Alero' },
    { label: 'AP', value: 'Ala-Pivot' },
    { label: 'P', value: 'Pivot' },
  ];
  const [posicion, setPosicion] = useState<Posicion | null>(null);

  const cancelarCreacionJugador = () => {
    setNombre('');
    setEquipo(0);
    setEdad(0);
    setTorneo(0);
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
                key={jugador.nombre + jugador.equipo}
                nombre={jugador.nombre}
                edad={jugador.edad}
                posicion={jugador.posicion}
                equipo={jugador.equipo}
                torneo={jugador.torneo}
              />
            ))
          ) : (
            <Text style={{ color: Colors.text }}>No hay jugadores creados.</Text>
          )}
        </ScrollView>

        {modalCrearJugador && (
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
            {/* <View style={[styles.input, styles.dropdownContainer]}>
              <EquiposDropDownComponent
                placeholder="Selecciona el Equipo del Jugador"
                data={Equipos.map((equipo) => ({ Equipo: { nombre: equipo.nombre } }))}
                onSelect={(item) => setEquipo(parseInt(item))}
              />
            </View>
            <View style={[styles.input, styles.dropdownContainer]}>
              <TorneosDropDownComponent
                placeholder="Selecciona el Torneo del Jugador"
                data={}
                onSelect={(item) => setTorneo(parseInt(item))}
              />
            </View> */}
            <View style={styles.botones}>
              <TouchableOpacity
                style={[styles.inputButton, { backgroundColor: Colors.barDownBackground }]}
                onPress={() => cancelarCreacionJugador()}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => {
                  agregarJugador();
                }}
              >
                <Text style={styles.buttonText}>Crear jugador</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View >
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => toggleModalCrearJugador()}
      >
        <Text style={styles.helpButtonText}>+</Text>
      </TouchableOpacity>
    </>
  )
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