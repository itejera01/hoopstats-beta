import React from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import TitleComponent from '@/components/titleComponent';


export default function Partidos() {
  return (
    <>
      <TitleComponent title="Partidos" />
      <View style={styles.container}>
      </View>
      <TouchableOpacity
        style={styles.helpButton}
      >
        <Text style={styles.helpButtonText}>+</Text>
      </TouchableOpacity>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
})
