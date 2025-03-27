import { Colors } from '@/constants/Colors';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import TitleComponent from '@/components/titleComponent';
import { router } from 'expo-router';

export default function Index() {
  const [viewGlosario, setViewGlosario] = React.useState(false);
  const redirectToJugador = () => {
    router.push('/jugador');
  }

  const redirectToPartidos = () => {
    router.push('/partidos');
  }

  const redirectToHistorial = () => {
    router.push('/historial');
  }

  return (
    <>
      <TitleComponent title="General" />
      <View style={styles.container}>
        <View style={styles.textArea}>
          <Text style={styles.subtitle}>Bienvenido a HoopStats!</Text>
        </View>
        <View style={styles.textArea}>
          <TouchableOpacity onPress={redirectToJugador}>
            <Text style={styles.text}>
              Para ver las estadísticas de un jugador, o para crear uno.
              <Text style={[styles.enfasis]}> Toque aquí </Text>
              o toque el libro en el apartado debajo.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textArea}>
          <TouchableOpacity onPress={redirectToPartidos}>
            <Text style={styles.text}>
              Para ingresar estadísticas de un partido.
              <Text style={[styles.enfasis]}> Toque aqui </Text>
              o toque la copa en el apartado debajo.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textArea}>
          <TouchableOpacity onPress={redirectToHistorial}>
            <Text style={styles.text}>
              Para ver todo el historial de partidos de un jugador.
              <Text style={styles.enfasis}> Toque aqui </Text>
              o toque la urna con una flecha apuntando hacia abajo en el apartado debajo.
            </Text>
          </TouchableOpacity>
        </View>
        {viewGlosario &&
          <TouchableOpacity style={styles.glosario} onPress={() => setViewGlosario(false)}>
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
        }
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => setViewGlosario(true)}
        >
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    alignItems: 'center',
    padding: 10,
  },
  textArea: {
    backgroundColor: Colors.menuBackground,
    height: 'auto',
    width: '90%',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: Colors.barDownBackground,
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    textAlign: 'center', // Add this line to center text horizontally
    alignItems: 'center',
    justifyContent: 'center',
  },
  enfasis: {
    color: Colors.buttonBackground,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  glosario: {
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