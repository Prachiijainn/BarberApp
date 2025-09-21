import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RoleSelectionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleCustomerRole = () => {
    navigation.navigate('CustomerRegistration' as never);
  };

  const handleBarberRole = () => {
    navigation.navigate('BarberRegistration' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>How would you like to use BarberBook?</Text>
      </View>

      <View style={styles.rolesContainer}>
        <TouchableOpacity
          style={styles.roleCard}
          onPress={handleCustomerRole}
        >
          <Icon name="person" size={60} color="#8B4513" />
          <Text style={styles.roleTitle}>I'm a Customer</Text>
          <Text style={styles.roleDescription}>
            Book appointments with barbers near you
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={handleBarberRole}
        >
          <Icon name="content-cut" size={60} color="#8B4513" />
          <Text style={styles.roleTitle}>I'm a Barber</Text>
          <Text style={styles.roleDescription}>
            Manage your shop and accept appointments
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B4423',
    textAlign: 'center',
  },
  rolesContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 15,
    marginBottom: 10,
  },
  roleDescription: {
    fontSize: 16,
    color: '#6B4423',
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;