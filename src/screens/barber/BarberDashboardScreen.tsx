import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const BarberDashboardScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barber Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, {user?.name || 'Barber'}</Text>
      <Text style={styles.info}>Manage your appointments and services here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B4423',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#6B4423',
  },
});

export default BarberDashboardScreen;