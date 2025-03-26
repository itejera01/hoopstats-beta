import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, Text, Image } from 'react-native';
import TitleComponent from '@/app/components/titleComponent';

export default function Jugador() {

  const [nombre, setNombre] = useState('');
    const [equipo, setEquipo] = useState('');
    const [edad, setEdad] = useState(0);
    const [torneo, setTorneo] = useState('');
    const [visible, setVisible] = useState(false);  
    interface Posicion {
      label: string;
      value: string;
    }
    const posiciones: Posicion[] = [
      { label: 'BA', value: 'Base' },
      { label: 'ES', value: 'Escolta' },
      { label: 'AL', value: 'Alero' },
      { label: 'AP', value: 'Ala-Pivot' },
      { label: 'P', value: 'Pivot' },
    ];  
    const [posicion, setPosicion] = useState<Posicion | null>(null);
  
    const cancelarCreacionJugador = () => {
      setNombre('');
      setEquipo('');
      setEdad(0);
      setTorneo('');
      setVisible(false);
    };

  return (
  <>
    <TitleComponent title="Jugador"/>    
    <View style={styles.main}>
    
    {visible && (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Ingrese el Nombre del Jugador"
        placeholderTextColor={Colors.text}
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        />
        <TextInput
        style={styles.input}
        placeholder="Ingrese la Edad del Jugador"
        placeholderTextColor={Colors.text}
        value={edad > 0 ? String(edad) : ''}
        onChangeText={(text) => setEdad(Number(text))}
        keyboardType="numeric"
        />
        <View style={{ flexDirection: 'row' }}>
        <View style={styles.posicion}>
          {posiciones.map((pos) => (
          <TouchableOpacity
            key={pos.value}
            style={styles.checkbox}
            onPress={() => setPosicion(pos)}
          >
            <Text style={[styles.text, posicion?.value === pos.value && { color: Colors.selected }]}>
            {pos.label}
            </Text>
          </TouchableOpacity>
          ))}
        </View>
        </View>
        <TextInput
        style={styles.input}
        placeholder="Selecciona el Equipo Del Jugador"
        placeholderTextColor={Colors.text}
        value={equipo}
        onChangeText={(text) => setEquipo(text)}
        />
        <TextInput
        style={styles.input}
        placeholder="Selecciona el Torneo del Jugador"
        placeholderTextColor={Colors.text}
        value={torneo}
        onChangeText={(text) => setTorneo(text)}
        />
    
        {/* Por ahora son Inputs, mas adelante serán checkboxes con base de datos */}
        <View style={styles.botones}>
        <TouchableOpacity 
          style={[styles.inputButton, {backgroundColor: Colors.barDownBackground}]}
          onPress={cancelarCreacionJugador}
          >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.buttonText}>Crear jugador</Text>
        </TouchableOpacity>
        </View>
      </View>
    )}
    </View>
    <TouchableOpacity
      style={styles.helpButton}
      onPress={() => setVisible(true)}
    >
      <Text style={styles.helpButtonText}>+</Text>
    </TouchableOpacity>
  </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appBackground,
    paddingHorizontal: 20, // Agrega un poco de espacio lateral
  },
  container: {
    flex: 1,
    width: '100%',
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
  logo: {
    marginBottom: 20, // Espacio debajo del logo
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15, // Reduce el espacio entre inputs
    borderBottomWidth: 1, // Haz la línea más delgada
    borderColor: Colors.barDownBackground,
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 10, // Espacio interno
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaciado uniforme entre botones
    marginTop: 20, // Espacio superior
    width: '100%',
  },
  inputButton: {
    flex: 1, // Los botones ocupan el mismo espacio
    height: 50,
    backgroundColor: Colors.selected,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5, // Espacio entre botones
  },
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  posicion: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.barDownBackground,
    color: Colors.text,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    height: 50,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
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
});