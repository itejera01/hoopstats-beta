import { Colors } from '@/constants/Colors';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const logo = (require('@/assets/images/icon.png'));

  const onLoginPress = () => {

  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.title}> Log-in </Text>
        <TextInput autoCapitalize="none" keyboardType='email-address' style={styles.input} value={emailAddress} onChangeText={setEmailAddress} placeholderTextColor={Colors.text} placeholder='Ingrese su Email ' />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholderTextColor={Colors.text} placeholder='Ingrese su Contraseña' />
        <TouchableOpacity onPress={() => router.push('/(auth)/reset-password')}>
          <Text style={[styles.question, styles.action]}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputButton} onPress={onLoginPress} disabled={!emailAddress || !password || isSigningIn}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={[styles.question, styles.action]}>¿No tienes una cuenta craeda?</Text>
        </TouchableOpacity>
      </View >
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
    fontSize: 14,
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
    fontSize: 14,
  }
});