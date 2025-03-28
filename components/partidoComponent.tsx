import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import RelojComponent from './relojComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function partidoComponent({
  fecha,
  inicio,
  jugadorSeleccionado,
  equipoJugador,
  equipoRival,
  torneo,
  localidad,
}: {
  fecha: string;
  inicio: string;
  jugadorSeleccionado: string;
  equipoJugador: string;
  equipoRival: string;
  torneo: string;
  localidad: string;
}) {
  const [statsVisible, setStatsVisible] = useState(false);
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



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador} onPress={toggleStatsVisible}>
        <View style={styles.imageContainer}>
          <Text style={styles.text}>(escudo)</Text>
        </View>
        <View>
          <Text style={[styles.text, styles.partido]}>{equipoJugador} vs {equipoRival}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{torneo}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>En {localidad}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{fecha} - {inicio}</Text>
        </View>
      </TouchableOpacity>
      {statsVisible && (
        <View style={styles.statsContainer}>
          <RelojComponent ref={(ref) => {
            if (ref) {
              setTiempoJugado(ref.getTime);
            }
          }} />
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
                    setDosPuntosIntentados(tirosLibresIntentados + 1)
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
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: Colors.buttonBackground,
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              const saveStats = async () => {
                try {
                  const partidoStats = {
                    fecha,
                    inicio,
                    jugadorSeleccionado,
                    equipoJugador,
                    equipoRival,
                    torneo,
                    localidad,
                    dosPuntosIntentados,
                    dosPuntosEmbocados,
                    tresPuntosIntentados,
                    tresPuntosEmbocados,
                    tirosLibresIntentados,
                    tirosLibresEmbocados,
                    asistencias,
                    rebotes,
                    robos,
                    tapones,
                    faltasCometidas,
                    perdidas,
                    tiempoJugado,
                  };
                  await AsyncStorage.setItem('partidosJugados', JSON.stringify(partidoStats));
                  console.log('Estadísticas guardadas correctamente');
                  console.log(JSON.stringify(partidoStats))
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
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: Colors.buttonBackground,
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={async () => {
              try {
                const existingStats = await AsyncStorage.getItem('partidos');
                if (existingStats) {
                  const statsArray = JSON.parse(existingStats);
                  const updatedStats = statsArray.filter(
                    (partido: any) =>
                      partido.fecha !== fecha || partido.inicio !== inicio
                  );
                  await AsyncStorage.setItem('partidos', JSON.stringify(updatedStats));
                  console.log('Partido eliminado correctamente');
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
        </View>
      )}
    </View>
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
    marginRight: 15,
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
  statsContainer: {
    backgroundColor: Colors.menuBackground,
    height: 'auto',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
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
  }
})