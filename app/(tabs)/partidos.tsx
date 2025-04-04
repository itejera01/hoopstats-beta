import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, TextInput, Modal } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSQLiteContext } from 'expo-sqlite';
import { Jugador, Torneo, Partido, Equipo } from '@/constants/Types';
import TitleComponent from '@/components/titleComponent';
import PartidoComponent from '@/components/partidoComponent';
import EquiposDropDownComponent from '@/components/equiposDropDownComponent';
import JugadorDropDownComponent from '@/components/jugadorDropDownComponent';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

export default function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [posiblesRivales, setPosiblesRivales] = useState<Equipo[]>([]);
  const [torneo, setTorneo] = useState<Torneo | null>(null);
  const [equipoJugador, setEquipoJugador] = useState<Equipo | null>(null);
  const [equipoRival, setEquipoRival] = useState<Equipo | null>(null);
  const [equipoLocal, setEquipoLocal] = useState<Equipo | null>(null);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<Jugador | null>(null);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [inicio, setInicio] = useState<Date | null>(null);
  const [modalCrearPartido, setModalCrearPartido] = useState(false);
  const [visibleFechaPicker, setVisibleFechaPicker] = useState(false);
  const [visibleInicioPicker, setVisibleInicioPicker] = useState(false);

  const db = useSQLiteContext();

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const partidos = await db.getAllAsync<Partido>(`
          SELECT 
            P.id, 
            P.fecha, 
            P.inicio, 
            P.jugado, 
            J.id AS jugador, 
            EJ.nombre AS equipoJugador_nombre, 
            ER.nombre AS equipoRival_nombre, 
            EL.nombre AS equipoLocal_nombre,
            T.nombre AS torneo_nombre
          FROM Partidos P
          INNER JOIN Jugador J ON P.jugador = J.id
          INNER JOIN Equipo EJ ON P.equipoJugador = EJ.id
          INNER JOIN Equipo ER ON P.equipoRival = ER.id
          INNER JOIN Equipo EL ON P.equipoLocal = EL.id
          INNER JOIN Torneo T ON P.torneo = T.id
          WHERE P.jugado = 0
        `);
        setPartidos(partidos);
      } catch (error) {
        error("Error fetching partidos:", error);
      }
    };
    fetchPartidos();
  }, [partidos]);

  useEffect(() => {
    const fetchEquipos = async () => {
      if (!jugadorSeleccionado) return;
      try {
        const [jugador] = await db.getAllAsync<{
          id: number;
          nombre: string;
          edad: number;
          posicion: string;
          equipo: number;
          torneo: number;
          equipo_nombre: string;
          torneo_nombre: string;
        }>(
          `SELECT 
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
                WHERE Jugador.id = ?`,
          [jugadorSeleccionado.id]
        );

        if (jugador?.equipo && jugador?.torneo) {
          const [resultado] = await db.getAllAsync<{
            equipo_nombre: string;
            torneo_nombre: string
          }>(
            `SELECT E.nombre AS equipo_nombre, T.nombre AS torneo_nombre
               FROM Equipo E
               JOIN Equipo_Torneo ET ON E.id = ET.equipo
               JOIN Torneo T ON ET.torneo = T.id
               WHERE ET.torneo = ? AND E.id = ?`,
            [jugador.torneo, jugador.equipo]
          );

          if (resultado) {
            setEquipoJugador({
              id: jugador.equipo,
              nombre: resultado.equipo_nombre
            });

            setTorneo({
              id: jugador.torneo,
              nombre: resultado.torneo_nombre
            });
          }

          const posiblesRivales = await db.getAllAsync<{ id: number; nombre: string }>(
            `SELECT E.id, E.nombre
             FROM Equipo E
             JOIN Equipo_Torneo ET ON E.id = ET.equipo
             WHERE ET.torneo = ?`,
            [jugador.torneo]
          );
          setPosiblesRivales(posiblesRivales);
        }
      } catch (error) {
        console.error("Error fetching equipos:", error);
      }
    };
    fetchEquipos();
  }, [jugadorSeleccionado]);


  const toggleModalCrearPartido = () => setModalCrearPartido(!modalCrearPartido);
  const toggleFechaPicker = () => setVisibleFechaPicker(!visibleFechaPicker);
  const toggleInicioPicker = () => setVisibleInicioPicker(!visibleInicioPicker);

  const agregarPartido = async () => {
    if (!jugadorSeleccionado || !equipoJugador || !equipoRival || !torneo || !fecha || !inicio || !equipoLocal) {
      alert("Por favor, complete todos los campos antes de crear el partido.");
      return;
    }

    const nuevoPartido: Partido = {
      id: 0,
      jugador: jugadorSeleccionado,
      equipoJugador: equipoJugador,
      equipoRival: equipoRival,
      torneo: torneo,
      equipoLocal: equipoLocal,
      fecha: moment(fecha || undefined).format("DD/MM/YYYY"),
      inicio: moment(inicio || undefined).format("HH:mm"),
      jugado: 0,
    };

    try {
      await db.runAsync(
        "INSERT INTO Partidos (jugador, equipoJugador, equipoRival, torneo, equipoLocal, fecha, inicio, jugado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          nuevoPartido.jugador?.id,
          nuevoPartido.equipoJugador?.id,
          nuevoPartido.equipoRival?.id,
          nuevoPartido.torneo?.id,
          nuevoPartido.equipoLocal?.id,
          nuevoPartido.fecha,
          nuevoPartido.inicio,
          nuevoPartido.jugado,
        ]
      );

      // Actualizar el estado con el nuevo partido
      setPartidos((prevPartidos) => [...prevPartidos, nuevoPartido]);

      // Reiniciar los valores
      setJugadorSeleccionado(null);
      setEquipoJugador(null);
      setEquipoRival(null);
      setFecha(null);
      setInicio(null);
      setEquipoLocal(null);
      toggleModalCrearPartido();
    } catch (error) {
      console.error("Error al insertar partido en la base de datos:", error);
    }
  };

  const cancelarCreacionPartido = () => {
    setJugadorSeleccionado(null);
    setEquipoJugador(null);
    setEquipoRival(null);
    setFecha(null);
    setInicio(null);
    setEquipoLocal(null);
    toggleModalCrearPartido();
  };

  return (
    <>
      <TitleComponent title="Partidos" />
      <View style={styles.main}>
        <ScrollView>
          {partidos.length > 0 ? (
            partidos
              .sort((a, b) => moment(a.fecha, 'DD/MM/YYYY').toDate().getTime() - moment(b.fecha, 'DD/MM/YYYY').toDate().getTime())
              .map((partido) => (
                <PartidoComponent
                  key={partido.id}
                  partido={partido.id}
                  fecha={partido.fecha ?? "Fecha no disponible"}
                  inicio={partido.inicio ?? "Hora no disponible"}
                  jugador={partido.jugador}
                  equipoJugador={partido.equipoJugador_nombre ?? "Equipo no definido"}
                  equipoRival={partido.equipoRival_nombre ?? "Rival no definido"}
                  torneo={partido.torneo_nombre ?? "Torneo no especificado"}
                  equipoLocal={partido.equipoLocal_nombre ?? "Local no definido"}
                />
              ))
          ) : (
            <Text style={{ color: Colors.text }}>No hay partidos creados.</Text>
          )}
        </ScrollView>
        <Modal visible={modalCrearPartido} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.input, styles.inicioInput]}>
                  <TouchableOpacity onPress={toggleFechaPicker}>
                    <TextInput
                      placeholder="Fecha"
                      placeholderTextColor={Colors.text}
                      value={fecha ? moment(fecha).format('DD/MM/YYYY') : ''}
                      editable={false}
                      style={styles.text}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.input, styles.inicioInput]}>
                  <TouchableOpacity onPress={toggleInicioPicker}>
                    <TextInput
                      placeholder="Hora de Inicio"
                      placeholderTextColor={Colors.text}
                      editable={false}
                      value={inicio ? moment(inicio).format('HH:mm') : ''}
                      style={styles.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                <JugadorDropDownComponent
                  placeholder="Seleccionar Jugador"
                  onSelect={(item) => setJugadorSeleccionado(item)}
                />
              </View>
              {jugadorSeleccionado != null && (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity
                        style={[
                          styles.localidad,
                        ]}
                        onPress={() => {
                          setEquipoLocal(equipoJugador)
                          alert('Equipo Local: ' + equipoJugador.nombre)
                        }}>
                        <Text style={[styles.localidadText]}>L</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.input, styles.inicioInput]}>
                      <Text style={[styles.text]}>{equipoJugador?.nombre || "Aliado"}</Text>
                    </View>
                    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
                      <Text style={styles.text}> VS </Text>
                    </View>
                    <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.input, styles.inicioInput]}>
                      <EquiposDropDownComponent
                        placeholder="Rival"
                        data={posiblesRivales}
                        onSelect={(item) => setEquipoRival(item)}
                      />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity
                        style={[
                          styles.localidad,
                        ]}
                        onPress={() => {
                          setEquipoLocal(equipoRival)
                          alert('Equipo Local: ' + equipoRival.nombre);
                        }}>
                        <Text style={[styles.localidadText]}>L</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.input]}>
                    <TextInput
                      style={styles.text}
                      placeholder="Seleccionar Torneo"
                      value={torneo?.nombre || ''}
                      editable={false}
                    />
                  </View>
                </>
              )}
              <View style={styles.botones}>
                <TouchableOpacity
                  style={[styles.inputButton, { backgroundColor: Colors.barDownBackground }]}
                  onPress={cancelarCreacionPartido}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={agregarPartido}
                >
                  <Text style={styles.buttonText}>Crear partido</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={[styles.helpButton, styles.refreshButton]}
        onPress={() => [router.push('/partidos'), setPartidos([])]}
      >
        <Text style={styles.helpButtonText}>
          <FontAwesome name="refresh" size={22} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={toggleModalCrearPartido}
      >
        <Text style={styles.helpButtonText}>+</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={visibleFechaPicker}
        mode="date"
        onConfirm={(date) => setFecha(date)}
        onCancel={toggleFechaPicker}
      />
      <DateTimePickerModal
        isVisible={visibleInicioPicker}
        mode="time"
        onConfirm={(time) => setInicio(time)}
        onCancel={toggleInicioPicker}
      />
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
  inicioInput: {
    width: '40%',
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
  refreshButton: {
    bottom: 20,
    left: 20,
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
  localidad: {
    backgroundColor: Colors.notSelected,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localidadText: {
    color: Colors.menuBackground,
  }
});
