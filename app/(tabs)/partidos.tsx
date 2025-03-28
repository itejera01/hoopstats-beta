import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, TextInput } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Equipos } from '@/constants/Equipos';
import TitleComponent from '@/components/titleComponent';
import PartidoComponent from '@/components/partidoComponent';
import EquiposDropDownComponent from '@/components/equiposDropDownComponent';
import JugadorDropDownComponent from '@/components/jugadorDropDownComponent';

interface Jugador {
  nombre: string,
  edad: number,
  equipo: string,
  posicion: string,
  torneo: string,
}

export default function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [torneo, setTorneo] = useState('');
  const [equipoJugador, setEquipoJugador] = useState('');
  const [equipoRival, setEquipoRival] = useState('');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState('');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [inicio, setInicio] = useState(null);
  const [localidad, setLocalidad] = useState('');
  const [modalCrearPartido, setModalCrearPartido] = useState(false);
  const [visibleFechaPicker, setVisibleFechaPicker] = useState(false);
  const [visibleInicioPicker, setVisibleInicioPicker] = useState(false);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const value = await AsyncStorage.getItem('jugadores');
        if (value) {
          const jugadores = JSON.parse(value) as Jugador[];
          const equipoJugador = jugadores.find(jugador => jugador.nombre === jugadorSeleccionado)?.equipo;
          const torneoJugador = jugadores.find(jugador => jugador.nombre === jugadorSeleccionado)?.torneo;
          setEquipoJugador(equipoJugador)
          setTorneo(torneoJugador)
        }
      } catch (error) {
        console.error('Error fetching partidos from AsyncStorage:', error);
      }
    }

    if (jugadorSeleccionado != '') {
      fetchEquipos();
    }
  }, [jugadorSeleccionado]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const value = await AsyncStorage.getItem('partidos');
        if (value) {
          setPartidos(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error fetching partidos from AsyncStorage:', error);
      }
    }
    fetchPartidos();
  }, [partidos]);

  const toggleModalCrearPartido = () => setModalCrearPartido(!modalCrearPartido);
  const toggleFechaPicker = () => setVisibleFechaPicker(!visibleFechaPicker);
  const toggleInicioPicker = () => setVisibleInicioPicker(!visibleInicioPicker);

  const agregarPartido = () => {
    if (!jugadorSeleccionado || !equipoJugador || !equipoRival || !torneo || !fecha || !inicio || !localidad) {
      alert('Por favor, complete todos los campos antes de crear el partido.');
      return;
    }
    const partido = {
      fecha: fecha ? moment(fecha).format('DD/MM/YYYY') : '',
      inicio,
      jugadorSeleccionado,
      equipoJugador,
      equipoRival,
      torneo,
      localidad,
    };
    setPartidos([...partidos, partido]);
    setJugadorSeleccionado('');
    setEquipoJugador('');
    setEquipoRival('');
    setFecha(null);
    setInicio('');
    setLocalidad('');
    toggleModalCrearPartido();
    AsyncStorage.setItem('partidos', JSON.stringify([...partidos, partido]));
  }

  const cancelarCreacionPartido = () => {
    setJugadorSeleccionado('');
    setEquipoJugador('');
    setEquipoRival('');
    setFecha(null);
    setInicio('');
    setLocalidad('');
    toggleModalCrearPartido();
  }

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
                  key={partido.fecha + partido.inicio + partido.equipoJugador + partido.equipoRival}
                  fecha={partido.fecha}
                  inicio={partido.inicio}
                  jugadorSeleccionado={partido.jugadorSeleccionado}
                  equipoJugador={partido.equipoJugador}
                  equipoRival={partido.equipoRival}
                  torneo={partido.torneo}
                  localidad={partido.localidad}
                />
              ))
          ) : (
            <Text style={{ color: Colors.text }}>No hay partidos creados.</Text>
          )}
        </ScrollView>
        {modalCrearPartido && (
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
                    value={inicio}
                    editable={false}
                    style={styles.text}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.input}>
              <JugadorDropDownComponent
                placeholder="Seleccionar Jugador"
                onSelect={(item) => setJugadorSeleccionado(item.toString())}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={[
                    styles.localidad,
                  ]}
                  onPress={() => {
                    setLocalidad(equipoJugador)
                    alert('Equipo Local: ' + equipoJugador);
                  }
                  }
                >
                  <Text style={[styles.localidadText]}>L</Text>
                </TouchableOpacity>
              </View>
              <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.input, styles.inicioInput]}>
                <Text style={[styles.text]}>{equipoJugador || "Equipo"}</Text>
              </View>
              <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={styles.text}> VS </Text>
              </View>
              <View style={[styles.input, styles.inicioInput]}>
                <EquiposDropDownComponent
                  placeholder="Equipo Rival"
                  data={Equipos.map((equipo) => ({ Equipo: { nombre: equipo.nombre } }))}
                  onSelect={(item) => setEquipoRival(item)}
                />
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={[
                    styles.localidad,
                  ]}
                  onPress={() => {
                    setLocalidad(equipoRival)
                    alert('Equipo Local: ' + equipoRival);
                  }}>
                  <Text style={[styles.localidadText]}>L</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.input, styles.dropdownContainer]}>
              <TextInput
                style={styles.dropdownText}
                placeholder="Torneo"
                placeholderTextColor={Colors.text}
                value={torneo}
                editable={false}
              />
            </View>
            <View style={styles.botones}>
              <TouchableOpacity
                style={[styles.inputButton, { backgroundColor: Colors.barDownBackground }]}
                onPress={() => cancelarCreacionPartido()}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => {
                  agregarPartido();
                }}
              >
                <Text style={styles.buttonText}>Crear partido</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View >
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => toggleModalCrearPartido()}
      >
        <Text style={styles.helpButtonText}>+</Text>
      </TouchableOpacity >

      <DateTimePickerModal
        isVisible={visibleFechaPicker}
        mode="date"
        onConfirm={(date) => setFecha(date)}
        onCancel={toggleFechaPicker}
      />
      <DateTimePickerModal
        isVisible={visibleInicioPicker}
        mode="time"
        onConfirm={(time) => setInicio(moment(time).format('HH:mm'))}
        onCancel={toggleInicioPicker}
      />
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
