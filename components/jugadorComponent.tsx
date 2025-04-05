import { Colors } from '@/constants/Colors';
import { Jugador } from '@/constants/Types';
import EscudosComponent from '@/components/escudosComponent';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSQLiteContext } from 'expo-sqlite';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState } from 'react';

const numStatsColumns = 2;
export default function JugadorComponent(
  { id, nombre, equipo, torneo, edad, posicion }:
    {
      id: number,
      nombre: string,
      equipo: string,
      torneo: string,
      edad: number,
      posicion: string,
    }) {
  const [showStats, setShowStats] = useState(false);
  const [partidos, setPartidos] = useState<any[]>([]);

  const db = useSQLiteContext();
  // Cargar los partidos desde AsyncStorage
  React.useEffect(() => {
    const fetchPartidos = async () => {
      const storedPartidos = await db.getAllAsync("SELECT * FROM Estadisticas_Jugador_Partido WHERE Jugador=?", [id])
      if (storedPartidos) {
        console.log(storedPartidos);
        try {
          setPartidos(storedPartidos);
        } catch (error) {
          console.log(error);
        }
      } else {
        setPartidos([]);
      }
    };
    fetchPartidos();
  }, []);

  // Calcular las estadísticas solo cuando los partidos cambian
  const data = React.useMemo(() => {
    if (partidos.length === 0) return []; // Si no hay partidos, no calcular estadísticas

    return [
      {
        label: 'MIN/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.minutos_jugados) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'PTS/P',
        value: (partidos.reduce((acc: number, partido: any) => {
          return acc + (Number(partido.dobles_embocados) || 0) * 2
            + (Number(partido.triples_embocados) || 0) * 3
            + (Number(partido.tiros_libres_embocados) || 0);
        }, 0) / partidos.length).toFixed(1),
      },
      {
        label: 'TC%',
        value: (() => {
          const totalIntentados = partidos.reduce((acc: number, partido: any) => acc + (partido.dobles_intentados || 0) + (partido.triples_intentados || 0), 0);
          const totalEmbocados = partidos.reduce((acc: number, partido: any) => acc + (partido.dobles_embocados || 0) + (partido.triples_embocados || 0), 0);
          return totalIntentados > 0
            ? `${((totalEmbocados / totalIntentados) * 100).toFixed(1)}%`
            : '00.0%';
        })(),
      },
      {
        label: '2PTS%',
        value: (() => {
          const totalIntentados = partidos.reduce((acc: number, partido: any) => acc + (partido.dobles_intentados || 0), 0);
          const totalEmbocados = partidos.reduce((acc: number, partido: any) => acc + (partido.dobles_embocados || 0), 0);
          return totalIntentados > 0
            ? `${((totalEmbocados / totalIntentados) * 100).toFixed(1)}%`
            : '00.0%';
        })(),
      },
      {
        label: '3PTS%',
        value: (() => {
          const totalIntentados = partidos.reduce((acc: number, partido: any) => acc + (partido.triples_intentados || 0), 0);
          const totalEmbocados = partidos.reduce((acc: number, partido: any) => acc + (partido.triples_embocados || 0), 0);
          return totalIntentados > 0
            ? `${((totalEmbocados / totalIntentados) * 100).toFixed(1)}%`
            : '00.0%';
        })(),
      },
      {
        label: 'TL%',
        value: (() => {
          const totalIntentados = partidos.reduce((acc: number, partido: any) => acc + (partido.tiros_libres_intentados || 0), 0);
          const totalEmbocados = partidos.reduce((acc: number, partido: any) => acc + (partido.tiros_libres_embocados || 0), 0);
          return totalIntentados > 0
            ? `${((totalEmbocados / totalIntentados) * 100).toFixed(1)}%`
            : '00.0%';
        })(),
      },
      {
        label: 'FC/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.faltas) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'ASI/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.asistencias) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'TAP/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.bloqueos) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'REB/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.rebotes) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'ROB/P',
        value: (partidos.reduce((acc: number, partido: any) => acc + (Number(partido.robos) || 0), 0) / partidos.length).toFixed(1),
      },
      {
        label: 'EFI',
        value: (partidos.reduce((acc: number, partido: any) => {
          const puntos = (Number(partido.dobles_embocados) || 0) * 2
            + (Number(partido.triples_embocados) || 0) * 3
            + (Number(partido.tiros_libres_embocados) || 0);
          const rebotes = Number(partido.rebotes) || 0;
          const asistencias = Number(partido.asistencias) || 0;
          const robos = Number(partido.robos) || 0;
          const tapones = Number(partido.bloqueos) || 0;

          const tirosCampoFallados = (Number(partido.dobles_intentados) || 0)
            + (Number(partido.triples_intentados) || 0) -
            ((Number(partido.dobles_embocados) || 0) + (Number(partido.triples_embocados) || 0));

          const tirosLibresFallados = (Number(partido.tiros_libres_intentados) || 0) - (Number(partido.tiros_libes_embocados) || 0);
          const perdidas = Number(partido.perdidas) || 0;
          const faltasRealizadas = Number(partido.faltas) || 0;

          const eficiencia = (puntos + rebotes + asistencias + robos + tapones)
            - (tirosCampoFallados + tirosLibresFallados + perdidas + faltasRealizadas);

          return acc + eficiencia;
        }, 0) / partidos.length).toFixed(1),
      },
    ];
  }, [partidos]);


  const eliminarJugador = async ({ id, nombre }) => {
    Alert.alert(
      "Confirmación",
      `¿Estás seguro de eliminar al jugador ${nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await db.runAsync("DELETE FROM Jugador WHERE id = ?", [id]);
              Alert.alert("Éxito", `Jugador ${nombre} eliminado exitosamente.`);
            } catch (error) {
              console.error("Error al eliminar el jugador:", error);
              Alert.alert("Error", "Hubo un problema al eliminar al jugador.");
            }
          }
        }
      ]
    );
  };



  const renderStats = ({ item }: { item: { label: string; value: number | string } }) => {
    return (
      <View style={styles.stats}>
        <Text style={[styles.text, styles.statsText]}>{item.label}: {item.value}</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador} onPress={() => setShowStats(!showStats)}>
        <View>
          <EscudosComponent teamName={equipo} />
        </View>
        <View>
          <Text style={[styles.text, styles.nombre]}>{nombre}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{torneo}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{equipo}</Text>
          <Text style={[styles.text, styles.edad]}>{edad} años - {posicion}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 10, }}>
          <TouchableOpacity onPress={() => eliminarJugador({ id, nombre })}>
            <FontAwesome name="trash" size={20} color={Colors.editButton} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Modal visible={showStats} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.statsContainer}>
              <FlatList
                data={data}
                renderItem={renderStats}
                numColumns={numStatsColumns}
                keyExtractor={(item, index) => index.toString()} // Esto asigna una clave única
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: Colors.editButton,
                    padding: 10,
                    borderRadius: 10,
                    width: '40%',
                    alignItems: 'center',
                  }}
                  onPress={() => setShowStats(false)}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="close" size={20} color={Colors.menuBackground} />
                    <Text style={[styles.text, { color: Colors.menuBackground, fontWeight: 'bold' }]}>
                      Cerrar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
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
    marginRight: 15,
    // TEMPORAL
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
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
})



