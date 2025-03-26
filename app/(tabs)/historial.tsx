import React from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import TitleComponent from '@/app/components/titleComponent';


export default function Historial() {
  return(
  <>
    <TitleComponent title="Historial"/>    
    <View style={styles.container}>
      <Text>
        Hola
      </Text>
    </View>
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
})