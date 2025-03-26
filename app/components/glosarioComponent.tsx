import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Colors} from '@/constants/Colors';

export default function GlosarioComponent(){
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(false)}>
      <Text style={styles.title}>Glosario</Text>
      <Text style={styles.definition}>PJ: Partidos Jugados</Text>
      <Text style={styles.definition}>TL: Tiros Libres anotados por partido</Text>
      <Text style={styles.definition}>2PTS: Dobles por partido</Text>
      <Text style={styles.definition}>FC: Faltas Cometidas</Text>
      <Text style={styles.definition}>3PTS: Triples por partido</Text>
      <Text style={styles.definition}>REB: Rebotes por partido</Text>
      <Text style={styles.definition}>%TL: % de Tiros Libre anotados</Text>
      <Text style={styles.definition}>MIP: Minutos por partido</Text>
      <Text style={styles.definition}>PUN: Puntos totales</Text>
      <Text style={styles.definition}>TC%: % de tiros convertidos</Text>
      <Text style={styles.definition}>ASI: Asistencias por partido</Text>
      <Text style={styles.definition}>ROB: Robos por partido</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
    borderBottomWidth: 1,
    borderColor: Colors.barDownBackground,
  },
  definition: {
    fontSize: 18,
    color: Colors.text,
  },
});

