import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TitleComponent from '@/components/titleComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Historial() {
  const [partidos, setPartidos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const partidosData = await AsyncStorage.getItem('partidosJugados');
        if (partidosData) {
          const parsedPartidos = JSON.parse(partidosData);
          setPartidos(Array.isArray(parsedPartidos) ? parsedPartidos.flat() : []);
        }
      } catch (error) {
        console.error('Error fetching partidos from AsyncStorage:', error);
      }
    }
    fetchPartidos();
  }, []);

  return (
    <>
      <TitleComponent title="Historial" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.statsContainer}>
            {partidos.length > 0 ? (
             <Text>Hola soy un placeholder</Text>
            ) : (
            <Text style={styles.statLabel}>No hay partidos jugados.</Text>
            )}
        </ScrollView>
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
});