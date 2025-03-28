import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import RelojComponent from './relojComponent';

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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoJugador}>
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
      <View style={styles.statsContainer}>
        <RelojComponent ref={(ref) => {
          if (ref) {
            console.log(ref.getTime()); 
          }
        }} />
      </View>
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