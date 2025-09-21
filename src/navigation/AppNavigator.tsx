import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList, TabParamList } from '../types';

// Import screens (we'll create these next)
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import CustomerRegistrationScreen from '../screens/auth/CustomerRegistrationScreen';
import BarberRegistrationScreen from '../screens/auth/BarberRegistrationScreen';

// Customer screens
import HomeScreen from '../screens/customer/HomeScreen';
import AppointmentsScreen from '../screens/customer/AppointmentsScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import BarberProfileScreen from '../screens/customer/BarberProfileScreen';
import BookingFlowScreen from '../screens/customer/BookingFlowScreen';
import PaymentScreen from '../screens/customer/PaymentScreen';

// Barber screens
import BarberDashboardScreen from '../screens/barber/BarberDashboardScreen';
import EarningsScreen from '../screens/barber/EarningsScreen';
import ReviewsScreen from '../screens/barber/ReviewsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Customer Tab Navigator
const CustomerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Appointments':
              iconName = 'event';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Barber Tab Navigator
const BarberTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Appointments':
              iconName = 'event';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'dashboard';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Dashboard" component={BarberDashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="CustomerRegistration" component={CustomerRegistrationScreen} />
      <Stack.Screen name="BarberRegistration" component={BarberRegistrationScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* Main app screens */}
            <Stack.Screen 
              name="Main" 
              component={user.role === 'customer' ? CustomerTabs : BarberTabs} 
            />
            
            {/* Modal screens */}
            <Stack.Screen 
              name="BarberProfile" 
              component={BarberProfileScreen}
              options={{ 
                presentation: 'modal',
                headerShown: true,
                title: 'Barber Profile'
              }}
            />
            <Stack.Screen 
              name="BookingFlow" 
              component={BookingFlowScreen}
              options={{ 
                presentation: 'modal',
                headerShown: true,
                title: 'Book Appointment'
              }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{ 
                presentation: 'modal',
                headerShown: true,
                title: 'Payment'
              }}
            />
            {user.role === 'barber' && (
              <>
                <Stack.Screen 
                  name="Earnings" 
                  component={EarningsScreen}
                  options={{ 
                    headerShown: true,
                    title: 'Earnings'
                  }}
                />
                <Stack.Screen 
                  name="Reviews" 
                  component={ReviewsScreen}
                  options={{ 
                    headerShown: true,
                    title: 'Reviews'
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {/* Auth screens */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;