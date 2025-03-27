import { Colors } from '@/constants/Colors';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const logo = (require('@/assets/images/icon.png'));

  const [pendingVerificacion, setPendingVerificacion] = useState(false);
  const [code, setCode] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerificacion(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const onVerifyPress = async () => {
    console.log("onVerifyPress");
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(signUpAttempt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (pendingVerificacion) {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.title}> Verificar Email </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el código de verificación"
          placeholderTextColor={Colors.text}
          keyboardType='numeric'
          value={code}
          onChangeText={(code) => { setCode(code); }}
        />
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => { onVerifyPress }}
          disabled={!code || isLoading}
        >
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
        {errors.map((error, index) => (
          <Text key={index} style={styles.error}>{error.message}</Text>
        ))}
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.title}> Crear Cuenta </Text>
        <TextInput autoCapitalize="none" keyboardType='email-address' style={styles.input} value={emailAddress} onChangeText={setEmailAddress} placeholderTextColor={Colors.text} placeholder='Ingrese su Email ' />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholderTextColor={Colors.text} placeholder='Ingrese su Contraseña' />
        <TouchableOpacity style={styles.inputButton} onPress={onSignInPress} disabled={!emailAddress || !password || isLoading}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
        {errors.map((error, index) => (
          <Text key={index} style={styles.error}>{error.message}</Text>
        ))}
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
  error: {
    color: 'red',
  },
});