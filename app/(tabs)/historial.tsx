import React from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TitleComponent from '@/components/titleComponent';

const topStats = [
  { label: 'Puntos', value: 30 },
  { label: 'Rebotes', value: 12 },
  { label: 'Asistencias', value: 8 },
  { label: 'Robos', value: 4 },
];

export default function Historial() {
  return (
    <>
      <TitleComponent title="Historial" />
      <View style={styles.container}>
        <Text style={styles.header}>Mejores Estadísticas</Text>
        <ScrollView contentContainerStyle={styles.statsContainer}>
          {topStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
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