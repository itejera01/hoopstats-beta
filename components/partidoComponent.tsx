import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import RelojComponent from './relojComponent';
import { Partido, Jugador, Equipo, Torneo } from '@/constants/Types';
import { useSQLiteContext } from 'expo-sqlite';
import EscudosComponent from './escudosComponent';
export default function partidoComponent({
  fecha,
  partido,
  inicio,
  jugador,
  nombreJugador,
  equipoJugador,
  equipoRival,
  torneo,
  equipoLocal,
}: {
  fecha: string;
  partido: number;
  inicio: string;
  jugador: number;
  nombreJugador: string;
  equipoJugador: string;
  equipoRival: string;
  equipoLocal: string;
  torneo: string;
}) {
  const [statsVisible, setStatsVisible] = useState(false);
  const [puntosEquipoJugador, setPuntosEquipoJugador] = useState(0);
  const [puntosEquipoRival, setPuntosEquipoRival] = useState(0);
  const [dosPuntosIntentados, setDosPuntosIntentados] = useState(0);
  const [dosPuntosEmbocados, setDosPuntosEmbocados] = useState(0);
  const [tresPuntosIntentados, setTresPuntosIntentados] = useState(0);
  const [tresPuntosEmbocados, setTresPuntosEmbocados] = useState(0);
  const [tirosLibresIntentados, setTirosLibresIntentados] = useState(0);
  const [tirosLibresEmbocados, setTirosLibresEmbocados] = useState(0);
  const [asistencias, setAsistencias] = useState(0);
  const [rebotes, setRebotes] = useState(0);
  const [robos, setRobos] = useState(0);
  const [tapones, setTapones] = useState(0);
  const [faltasCometidas, setFaltasCometidas] = useState(0);
  const [perdidas, setPerdidas] = useState(0);
  const [tiempoJugado, setTiempoJugado] = useState({ minutes: 0, seconds: 0 });

  const toggleStatsVisible = () => setStatsVisible(!statsVisible);

  const db = useSQLiteContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador} onPress={toggleStatsVisible}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row' }}>
            {equipoLocal == equipoJugador ? (
              <EscudosComponent teamName={equipoJugador} />
            ) : (
              <EscudosComponent teamName={equipoRival} />
            )}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>VS</Text>
            </View>
            {equipoLocal != equipoJugador ? (
              <EscudosComponent teamName={equipoJugador} />
            ) : (
              <EscudosComponent teamName={equipoRival} />
            )}
          </View>
          <View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={[styles.text, styles.partido]}>{fecha} - {inicio}</Text>
              <Text style={[styles.text, styles.datosEquipo]}>{torneo}</Text>
              <Text style={[styles.text, styles.datosEquipo]}>{nombreJugador}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity >
      <Modal visible={statsVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <RelojComponent ref={(ref) => {
              if (ref) {
                setTiempoJugado(ref.getTime);
              }
            }} />
            <View style={{ borderBlockColor: Colors.text, borderBottomWidth: 1, width: '100%', paddingTop: 10 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 10 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%' }}>
                <EscudosComponent teamName={equipoJugador} />
                <TextInput
                  style={[styles.input]}
                  value={puntosEquipoJugador > 0 ? String(puntosEquipoJugador) : '0'}
                  onChangeText={(text) => {
                    setPuntosEquipoJugador(Number(text));
                  }}
                  keyboardType='numeric'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoJugador(puntosEquipoJugador + 3);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoJugador(puntosEquipoJugador + 2);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoJugador(puntosEquipoJugador + 1);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+1</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%' }}>
                <EscudosComponent teamName={equipoRival} />
                <TextInput
                  style={styles.input}
                  value={puntosEquipoRival > 0 ? String(puntosEquipoRival) : '0'}
                  onChangeText={(text) => {
                    setPuntosEquipoRival(Number(text));
                  }}
                  keyboardType='numeric'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoRival(puntosEquipoRival + 3);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoRival(puntosEquipoRival + 2);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '30%', backgroundColor: Colors.editButton }]}
                    onPress={() => {
                      setPuntosEquipoRival(puntosEquipoRival + 1);
                    }}>
                    <Text style={[styles.text, styles.statsText]}>+1</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ borderBlockColor: Colors.text, borderBottomWidth: 1, width: '100%', paddingTop: 10 }}></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.stats}>
                <TouchableOpacity
                  onPress={() => {
                    setDosPuntosEmbocados(0)
                    setDosPuntosIntentados(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>2PTS</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setDosPuntosEmbocados(dosPuntosEmbocados + 1)
                      setDosPuntosIntentados(dosPuntosIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{dosPuntosEmbocados}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.text, { fontSize: 18 }]}>/</Text>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setDosPuntosIntentados(dosPuntosIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{dosPuntosIntentados}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.stats}>
                <TouchableOpacity
                  onPress={() => {
                    setTresPuntosEmbocados(0)
                    setTresPuntosIntentados(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>3PTS</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setTresPuntosEmbocados(tresPuntosEmbocados + 1)
                      setTresPuntosIntentados(tresPuntosIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{tresPuntosEmbocados}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.text, { fontSize: 18 }]}>/</Text>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setTresPuntosIntentados(tresPuntosIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{tresPuntosIntentados}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.stats}>
                <TouchableOpacity
                  onPress={() => {
                    setTirosLibresEmbocados(0)
                    setTirosLibresIntentados(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>TL</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setTirosLibresEmbocados(tirosLibresEmbocados + 1)
                      setTirosLibresIntentados(tirosLibresIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{tirosLibresEmbocados}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.text, { fontSize: 18 }]}>/</Text>
                  <TouchableOpacity
                    style={styles.buttonStats}
                    onPress={() => {
                      setTirosLibresIntentados(tirosLibresIntentados + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{tirosLibresIntentados}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ maxWidth: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setAsistencias(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>ASI</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      setAsistencias(asistencias + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{asistencias}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setRobos(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>ROB</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      setRobos(robos + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{robos}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setRebotes(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>REB</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      setRebotes(rebotes + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{rebotes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setTapones(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>TAP</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      setTapones(tapones + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{tapones}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setFaltasCometidas(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>FC</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      if (faltasCometidas < 5) {
                        setFaltasCometidas(faltasCometidas + 1)
                      }
                    }}>
                    <Text
                      style={[
                        styles.text,
                        styles.statsText,
                        faltasCometidas >= 5 && { color: 'red' },
                      ]}>
                      {faltasCometidas}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.stats, { width: '15%', marginHorizontal: 2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setPerdidas(0)
                  }}>
                  <Text style={[styles.text, styles.statsTextTitle]}>PER</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.buttonStats, { width: '70%' }]}
                    onPress={() => {
                      setPerdidas(perdidas + 1)
                    }}>
                    <Text style={[styles.text, styles.statsText]}>{perdidas}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.buttonBackground,
                  padding: 10,
                  borderRadius: 10,
                  width: '40%',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  try {
                    const partidoEncontrado = await db.getAllAsync('SELECT * FROM Partidos WHERE id=?', [partido]);
                    console.log(partidoEncontrado);
                    if (partidoEncontrado) {
                      const response = await db.runAsync('DELETE FROM Partidos WHERE id=?', [partido]);
                      console.log('Partido eliminado');
                    } else {
                      console.log('No se encontró el partido');
                    }
                  } catch (error) {
                    console.error('Error al eliminar el partido:', error);
                  }
                }}
              >
                <Text style={[styles.text, { color: Colors.text, fontWeight: 'bold' }]}>
                  Eliminar Partido
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.editButton,
                  padding: 10,
                  borderRadius: 10,
                  width: '40%',
                  alignItems: 'center',
                }}
                onPress={toggleStatsVisible}
              >
                <Text style={[styles.text, { color: Colors.menuBackground, fontWeight: 'bold' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: Colors.barDownBackground,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                width: '100%',
              }}
              onPress={() => {
                const saveStats = async () => {
                  try {
                    const partidoStats = {
                      partido, // ID del partido
                      jugador, // ID del jugador
                      puntos_equipo_jugador: puntosEquipoJugador, // Puntos del equipo jugador
                      puntos_equipo_rival: puntosEquipoRival, // Puntos del equipo rival
                      puntos: (dosPuntosEmbocados * 2) + (tresPuntosEmbocados * 3) + (tirosLibresEmbocados), // Total de puntos (dobles, triples, libres)
                      asistencias, // Asistencias
                      rebotes, // Rebotes
                      robos, // Robos
                      tapones, // Bloqueos (o tapones, asegúrate de que sea lo que quieres)
                      perdidas, // Pérdidas
                      faltas: faltasCometidas, // Faltas cometidas
                      minutos_jugados: tiempoJugado?.minutes, // Minutos jugados
                      dobles_embocados: dosPuntosEmbocados, // Dobles embocados
                      dobles_intentados: dosPuntosIntentados, // Dobles intentados
                      tiros_libres_intentados: tirosLibresIntentados, // Tiros libres intentados
                      tiros_libres_embocados: tirosLibresEmbocados, // Tiros libres embocados
                      triples_intentados: tresPuntosIntentados, // Triples intentados
                      triples_embocados: tresPuntosEmbocados, // Triples embocados
                    };
                    const values = [
                      partidoStats.partido,
                      partidoStats.jugador,
                      partidoStats.puntos_equipo_jugador,
                      partidoStats.puntos_equipo_rival,
                      partidoStats.puntos,
                      partidoStats.asistencias,
                      partidoStats.rebotes,
                      partidoStats.robos,
                      partidoStats.tapones, // Aquí se ajusta el nombre de "tapones"
                      partidoStats.perdidas,
                      partidoStats.faltas,
                      partidoStats.minutos_jugados,
                      partidoStats.dobles_embocados,
                      partidoStats.dobles_intentados,
                      partidoStats.tiros_libres_intentados,
                      partidoStats.tiros_libres_embocados,
                      partidoStats.triples_intentados,
                      partidoStats.triples_embocados,
                    ];
                    await db.runAsync('UPDATE Partidos set Jugado=1 WHERE id=?', [partido]);
                    await db.runAsync(`
                      INSERT INTO Estadisticas_Jugador_Partido (
                        partido, jugador, puntos_equipo_jugador, puntos_equipo_rival,
                        puntos, asistencias, rebotes, robos, bloqueos, perdidas,
                        faltas, minutos_jugados, dobles_embocados, dobles_intentados,
                        tiros_libres_intentados, tiros_libres_embocados,
                        triples_intentados, triples_embocados
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, values);

                  } catch (error) {
                    console.error('Error al guardar las estadísticas:', error);
                  }
                };
                saveStats();
              }}
            >
              <Text style={[styles.text, { color: Colors.text, fontWeight: 'bold' }]}>
                Finalizar Partido
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
  )
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
  partido: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datosEquipo: {
    fontSize: 16,
  },
  edad: {
    fontSize: 14,
  },
  partidosJugados: {
    color: Colors.buttonBackground,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'regular',
    color: Colors.text,
    margin: 2,
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
    margin: 15,
    height: 50,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.menuBackground,
  },
  statsTextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonStats: {
    width: '50%',
    backgroundColor: Colors.notSelected,
    borderRadius: 5,
    justifyContent: 'center',
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
})