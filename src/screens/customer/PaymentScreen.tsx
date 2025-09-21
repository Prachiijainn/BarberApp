import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Payment integration will be implemented here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B4423',
    textAlign: 'center',
  },
});

export default PaymentScreen;