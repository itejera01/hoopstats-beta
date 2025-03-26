import { Colors } from '@/constants/Colors';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
export default function Index() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const logo = (require('@/assets/images/icon.png'));
  const router = useRouter();
  const login = () => {
    router.push('/(tabs)');
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
          <Text style={styles.title}> Login </Text>
          <TextInput style={styles.input} onChangeText={(text) => setUser(text)} placeholderTextColor={Colors.text} placeholder='Ingrese su Usuario '/>
          <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} placeholderTextColor={Colors.text} placeholder='Ingrese su Contraseña'/>
          <TouchableOpacity>
            <Text style={[styles.question, styles.action]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButton} onPress={login}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <Text style={styles.question}>¿No tienes una cuenta craeda?  
            <TouchableOpacity>
              <Text style={[styles.crearCuenta, styles.action]}>Ingresa aqui</Text>
            </TouchableOpacity>
          </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.menuBackground,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    height: 150,
    width: 125,
    resizeMode: 'contain',
  },
  title: {
    color: Colors.text,
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
  },
  input: {
    width: '60%',
    height: 50,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: Colors.barDownBackground,
    color: Colors.text,
    fontSize: 16,
  },
  inputButton: {
    width: '50%',
    height: 40,
    backgroundColor: Colors.selected,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  action: {
    textDecorationLine: 'underline',
  },
  question: {
    color: Colors.text,
    fontSize: 12,
  },
  crearCuenta: {
    marginLeft: 5,
    color: Colors.selected,
    fontWeight: 'bold',
  }
});