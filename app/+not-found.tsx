import { Colors } from '@/constants/Colors';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

export default function NotFoundScreen() {
  const router = useRouter();
  const logo = (require('@/assets/images/icon.png'));
  

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.title}> 404 - Página no encontrada </Text>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.action}>Volver al inicio</Text>
        </TouchableOpacity>
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
  
  action: {
    textDecorationLine: 'underline',
    color: Colors.text,
    fontSize: 14,
  },
});