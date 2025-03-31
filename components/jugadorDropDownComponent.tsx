import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Jugador, Posicion } from "@/constants/Types";
import { useSQLiteContext } from "expo-sqlite";
interface jugadorDropDownComponentProps {
  placeholder: string;
  onSelect: (item: Jugador) => void;
}

const jugadorDropDownComponent: React.FC<jugadorDropDownComponentProps> = ({ placeholder, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Jugador | null>(null);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const db = useSQLiteContext();

  const posiciones: Posicion[] = [
    { label: 'BA', value: 'Base' },
    { label: 'ES', value: 'Escolta' },
    { label: 'AL', value: 'Alero' },
    { label: 'AP', value: 'Ala-Pivot' },
    { label: 'P', value: 'Pivot' },
  ];

  useEffect(() => {
    const getJugadores = async () => {
      const jugadoresElegibles = await db.getAllAsync<{
        id: number;
        nombre: string;
        edad: number;
        posicion: string;
        equipo: number;
        torneo: number;
        equipo_nombre: string;
        torneo_nombre: string;
      }>(`
          SELECT 
              Jugador.id,
              Jugador.nombre,
              Jugador.edad,
              Jugador.posicion,
              Jugador.equipo,
              Jugador.torneo,
              Equipo.nombre AS equipo_nombre,
              Torneo.nombre AS torneo_nombre
          FROM Jugador
          INNER JOIN Equipo ON Jugador.equipo = Equipo.id
          INNER JOIN Torneo ON Jugador.torneo = Torneo.id
      `);
      setJugadores((prevJugadores) => {
        const nuevosJugadores = jugadoresElegibles
          .filter(item => !prevJugadores.some(jugador => jugador.id === item.id)) // Filtra los duplicados
          .map((item) => {
            const nuevaPosicion = posiciones.find(p => p.value === item.posicion) || null;

            return {
              id: item.id,
              nombre: item.nombre,
              edad: item.edad,
              posicion: nuevaPosicion?.value || null,
              equipo: {
                id: item.equipo,
                nombre: item.equipo_nombre
              },
              torneo: {
                id: item.torneo,
                nombre: item.torneo_nombre
              }
            };
          });
        return [...prevJugadores, ...nuevosJugadores];
      });

    }
    try {
      getJugadores();
    } catch (e) {
      console.log(e);
    }
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedValue(null);
  }

  const handleSelect = (item: Jugador) => {
    setSelectedValue(item)
    onSelect(selectedValue)
  };

  useEffect(() => {
    if (selectedValue != null) {
      onSelect(selectedValue);
      setModalVisible(!isModalVisible);
    }
  }, [selectedValue]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>{selectedValue?.nombre || placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <ScrollView style={styles.modalContent}>
            {jugadores ? jugadores.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => { handleSelect(item) }}
              >
                <Text style={styles.optionText}>{item?.nombre}</Text>
              </TouchableOpacity>
            )) : null}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    backgroundColor: Colors.menuBackground,
    borderRadius: 10,
    padding: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 15,
    width: '50%',
  },
  closeText: {
    color: Colors.text,
    textAlign: "center",
  },
});

export default jugadorDropDownComponent;
