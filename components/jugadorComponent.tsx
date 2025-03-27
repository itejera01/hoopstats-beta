import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const numStatsColumns = 2;
export default function JugadorComponent(
  { nombre, equipo, torneo, edad, posicion }:
    {
      nombre: string,
      equipo: string,
      torneo: string,
      edad: number,
      posicion: string,
    }) {
  const [showStats, setShowStats] = useState(false);

  const data = [
    { label: 'MIP', value: 0 },
    { label: 'PUN', value: 0 },
    { label: 'TC%', value: '00,0%' },
    { label: 'TL', value: 0 },
    { label: 'TL%', value: '00,0%' },
    { label: 'FC', value: 0 },
    { label: '2PTS', value: 0 },
    { label: '3PTS', value: 0 },
    { label: 'ASI', value: 0 },
    { label: 'TAP', value: 0 },
    { label: 'REB', value: 0 },
    { label: 'ROB', value: 0 },
  ]

  const renderStats = ({ item }: { item: { label: string; value: number | string } }) => (
    <View style={styles.stats}>
      <Text style={[styles.text, styles.statsText]}>{item.label}: {item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador} onPress={() => setShowStats(!showStats)}>
        <View style={styles.imageContainer}>
          <Text style={styles.text}>(escudo)</Text>
        </View>
        <View>
          <Text style={[styles.text, styles.nombre]}>{nombre}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{torneo}</Text>
          <Text style={[styles.text, styles.datosEquipo]}>{equipo}</Text>
          <Text style={[styles.text, styles.edad]}>{edad} años - {posicion}</Text>
        </View>
      </TouchableOpacity>
      {showStats && (
        <View style={styles.statsContainer}>
          <FlatList
            data={data}
            renderItem={renderStats}
            numColumns={numStatsColumns}
          />
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
  }
})



