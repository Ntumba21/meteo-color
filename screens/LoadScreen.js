import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useColor } from '../components/ColorContext';

const LoadScreen = ({ navigation }) => {
  const { color, getHexColor } = useColor();
  const hexColor = getHexColor(color);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: hexColor }]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '30%',
    width: '60%',
  },
});

export default LoadScreen;
