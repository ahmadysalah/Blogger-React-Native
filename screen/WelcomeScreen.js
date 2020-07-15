import React, { useState } from 'react';
import {
  StyleSheet, Image, View, Text,
} from 'react-native';
import welcomePg from '../assets/bg.png';
import logo from '../assets/Logo/logo.png';

export default function WelcomeScreen({ history: { push } }) {
  setTimeout(() => {
    push('/home');
  }, 2 * 1000);
  return (
      <View style={styles.container}>
      <Text style={styles.bioText}>Designed By: Ahmad Salah</Text>
      <Image source={welcomePg} style={styles.background}/>
      <Image style={styles.logo} source={logo} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    opacity: 0.4,
  },
  logo: {
    position: 'absolute',
    opacity: 1,
  },
  bioText: {
    position: 'absolute',
    bottom: 50,
  },
});
