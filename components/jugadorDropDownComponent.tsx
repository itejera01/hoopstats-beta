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
import AsyncStorage from '@react-native-async-storage/async-storage';

interface jugadorDropDownComponentProps {
  placeholder: string;
  onSelect: (item: string) => void;
}

const jugadorDropDownComponent: React.FC<jugadorDropDownComponentProps> = ({ placeholder, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    try {
      AsyncStorage.getItem('jugadores').then((value: any) => {
        if (value) {
          setJugadores(JSON.parse(value));
        } else {
          setJugadores([]);
        }
      })
    } catch (e) {
      console.log(e);
    }
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedValue('');
  }

  const handleSelect = (item: any) => {
    setSelectedValue(item.nombre)
    onSelect(selectedValue)
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (selectedValue != '') {
      onSelect(selectedValue);
      setModalVisible(!isModalVisible);
    }
  }, [selectedValue]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>{selectedValue || placeholder}</Text>
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
                <Text style={styles.optionText}>{item.nombre}</Text>
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
