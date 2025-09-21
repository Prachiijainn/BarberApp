import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.appName}>BarberBook</Text>
        <Text style={styles.tagline}>Your perfect cut awaits</Text>
      </View>
      
      <ActivityIndicator 
        size="large" 
        color="#8B4513" 
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
    fontFamily: 'System',
  },
  tagline: {
    fontSize: 18,
    color: '#6B4423',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loader: {
    marginTop: 30,
  },
});

export default SplashScreen;