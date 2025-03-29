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

type Equipo = {
  id: number;
  nombre: string;
};
interface EquiposDropDownComponentProps {
  placeholder: string;
  data: Equipo[];
  onSelect: (item: number) => void;
}

const EquiposDropDownComponent: React.FC<EquiposDropDownComponentProps> = ({ placeholder, data, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedValue(0);
  }

  useEffect(() => {
    if (selectedValue != 0) {
      onSelect(selectedValue);
      setModalVisible(!isModalVisible);
    }
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {
        if (data.length > 0) {
          toggleModal();
        }
      }}>
        <Text style={styles.buttonText}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <ScrollView style={styles.modalContent}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => setSelectedValue(item.id)}
              >
                <Text style={styles.optionText}>{item.nombre}</Text>
              </TouchableOpacity>
            ))}
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

export default EquiposDropDownComponent;
