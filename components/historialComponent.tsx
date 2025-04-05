import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Equipo } from '@/constants/Types';
import { useSQLiteContext } from 'expo-sqlite';
import EscudosComponent from './escudosComponent';

export default function HistorialComponent(data: any) {
  const db = useSQLiteContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [equipoJugador, setEquipoJugador] = useState<Equipo | null>(null);
  const [equipoRival, setEquipoRival] = useState<Equipo | null>(null);
  const [equipoLocal, setEquipoLocal] = useState<Equipo | null>(null);
  const toggleModalVisible = () => setModalVisible(!modalVisible);

  const renderStats = ({ item }: { item: { label: string; value: number | string } }) => {
    return (
      <View style={styles.stats}>
        <Text style={[styles.text, styles.statsText]}>
          {item.label}
        </Text>
        <Text style={[styles.text, styles.statsText]}>
          {item.value}
        </Text>
      </View>
    );
  };


  useEffect(() => {
    const fetchEquipoJugador = async () => {
      try {
        const equipoJugadorArray = await db.getAllAsync<{ id: number; nombre: string }>('SELECT * FROM Equipo WHERE id = ?', [data.data.equipoJugador]);
        if (equipoJugadorArray && equipoJugadorArray.length > 0) {
          const equipoJugador = equipoJugadorArray[0];
          setEquipoJugador({
            id: equipoJugador.id,
            nombre: equipoJugador.nombre
          });
        }
      } catch (error) {
        console.error('Error fetching equipo jugador:', error);
      }
    };
    const fetchEquipoRival = async () => {
      try {
        const equipoRivalArray = await db.getAllAsync<{ id: number; nombre: string }>('SELECT * FROM Equipo WHERE id = ?', [data.data.equipoRival]);
        if (equipoRivalArray && equipoRivalArray.length > 0) {
          const equipoRival = equipoRivalArray[0];
          setEquipoRival({
            id: equipoRival.id,
            nombre: equipoRival.nombre
          });
        }
      } catch (error) {
        console.error('Error fetching equipo jugador:', error);
      }
    };
    const fetchEquipoLocal = async () => {
      try {
        const equipoLocalArray = await db.getAllAsync<{ id: number; nombre: string }>('SELECT * FROM Equipo WHERE id = ?', [data.data.equipoLocal]);
        if (equipoLocalArray && equipoLocalArray.length > 0) {
          const equipoLocal = equipoLocalArray[0];
          setEquipoLocal({
            id: equipoLocal.id,
            nombre: equipoLocal.nombre
          });
        }
      } catch (error) {
        console.error('Error fetching equipo jugador:', error);
      }
    };
    fetchEquipoJugador();
    fetchEquipoRival();
    fetchEquipoLocal();
  }, [data.data.equipoJugador, data.data.equipoRival, data.data.equipoLocal]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador} onPress={toggleModalVisible}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row' }}>
            {equipoLocal?.id === equipoJugador?.id ? (
              <>
                <EscudosComponent teamName={equipoJugador?.nombre} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.text, styles.puntos]}>{data.data.puntos_equipo_jugador}</Text>
                </View>
              </>
            ) : (
              <>
                <EscudosComponent teamName={equipoRival?.nombre} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.text, styles.puntos]}>{data.data.puntos_equipo_rival}</Text>
                </View>
              </>
            )}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>-</Text>
            </View>
            {equipoLocal?.id != equipoJugador?.id ? (
              <>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.text, styles.puntos]}>{data.data.puntos_equipo_jugador}</Text>
                </View>
                <EscudosComponent teamName={equipoJugador?.nombre} />
              </>
            ) : (
              <>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.text, styles.puntos]}>{data.data.puntos_equipo_rival}</Text>
                </View>
                <EscudosComponent teamName={equipoRival?.nombre} />
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.statsContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    Fecha: {data.data.fecha}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    Inicio: {data.data.inicio}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    Minutos: {data.data.minutos_jugados}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    Puntos: {data.data.puntos}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    2PTS: {data.data.dobles_embocados} / {data.data.dobles_intentados}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    3PTS: {data.data.triples_embocados} / {data.data.triples_intentados}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    TL: {data.data.tiros_libres_embocados} / {data.data.tiros_libres_intentados}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    FC: {data.data.faltas}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    ASI: {data.data.asistencias}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    REB: {data.data.rebotes}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    TAP: {data.data.bloqueos}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    ROB: {data.data.robos}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    PER: {data.data.perdidas}
                  </Text>
                </View>
                <View style={styles.stats}>
                  <Text style={[styles.text, styles.statsText]}>
                    EFI: {
                      (data.data.puntos + data.data.rebotes + data.data.asistencias + data.data.robos + data.data.bloqueos) -
                      ((data.data.dobles_intentados - data.data.dobles_embocados) + (data.data.triples_intentados - data.data.triples_embocados) + (data.data.tiros_libres_intentados - data.data.tiros_libres_embocados) + data.data.perdidas + data.data.faltas)
                    }
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: Colors.editButton,
                padding: 10,
                borderRadius: 10,
                width: '40%',
                alignItems: 'center',
              }}
              onPress={toggleModalVisible}
            >
              <Text style={[styles.text, { color: Colors.menuBackground, fontWeight: 'bold' }]}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.menuBackground,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 25,
  },
  infoJugador: {
    flexDirection: 'row',
    backgroundColor: Colors.menuBackground,
    height: 'auto',
    borderRadius: 15,
    padding: 15,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 15,
    borderColor: Colors.appBackground,
    borderWidth: 2,
    marginHorizontal: 15,
    // TEMPORAL
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'regular',
    color: Colors.text,
    margin: 2,
  },
  puntos: {
    color: Colors.editButton,
    fontSize: 20,
    fontWeight: 'bold',
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
  stats: {
    borderBottomWidth: 1,
    borderColor: Colors.text,
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsTextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    backgroundColor: Colors.menuBackground,
    height: 'auto',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
  },

})