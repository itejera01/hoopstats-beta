import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type Torneo = {
  id: number;
  nombre: string;
};

interface TorneosDropDownComponentProps {
  placeholder: string;
  data: Torneo[];
  onSelect: (item: Torneo) => void;
}

const TorneosDropDownComponent: React.FC<TorneosDropDownComponentProps> = ({ placeholder, data, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{ id: number | null; nombre: string }>({
    id: null,
    nombre: "",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedValue({ id: null, nombre: "" });
    onSelect(null);
  };

  const handleSelect = (item: Torneo) => {
    setSelectedValue({ id: item.id, nombre: item.nombre });
    onSelect({ id: item.id, nombre: item.nombre });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (data.length > 0) {
            setModalVisible(true);
          }
        }}
      >
        <Text style={styles.buttonText}>
          {selectedValue.id !== null ? selectedValue.nombre : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <ScrollView style={styles.modalContent}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => handleSelect(item)}
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

export default TorneosDropDownComponent;
