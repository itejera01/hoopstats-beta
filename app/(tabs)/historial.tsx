import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TitleComponent from '@/components/titleComponent';
import { useSQLiteContext } from 'expo-sqlite';
import { Partido, Estadisticas_Partido } from '@/constants/Types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import HistorialComponent from '@/components/historialComponent';
export default function Historial() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [stats, setStats] = useState<Estadisticas_Partido[]>([]);
  const [partidosJugados, setPartidosJugados] = useState([]);

  const db = useSQLiteContext();
  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const partidosJugados = await db.getAllAsync<Partido>('SELECT * FROM Partidos where jugado=1');
        if (partidosJugados) {
          setPartidos(partidosJugados);
        }
        const stats = await db.getAllAsync<Estadisticas_Partido>('SELECT * FROM Estadisticas_Jugador_Partido');
        if (stats) {
          setStats(stats);
        }
        if (stats.length > 0 && partidosJugados.length > 0) {
          const partidosConStats = stats.map(stat => {
            const partido = partidos.find(p => p.id === stat.partido);
            if (partido) {
              return { ...partido, ...stat };
            }
            return null;
          }).filter(item => item !== null);
          setPartidosJugados(partidosConStats);
        }

      } catch (error) {
        console.error('Error fetching partidos from AsyncStorage:', error);
      }
    }
    fetchPartidos();
  }, [partidosJugados]);

  return (
    <>
      <TitleComponent title="Historial" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.statsContainer}>
          {partidosJugados.length > 0 ? (
            partidosJugados.map((partido: any) => (
              <View>
                <HistorialComponent data={partido} />
              </View>
            ))
          ) : (
            <Text style={styles.statLabel}>No hay partidos jugados.</Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={[styles.helpButton, styles.refreshButton]}
          onPress={() => [router.push('/historial'), setStats([]), setPartidos([])]}
        >
          <Text style={styles.helpButtonText}>
            <FontAwesome name="refresh" size={22} />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
  },
  statsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: Colors.menuBackground,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
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
});