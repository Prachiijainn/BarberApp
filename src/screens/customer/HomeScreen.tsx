import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext';
import { Barber } from '../../types';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    // This will be implemented with actual Firestore data fetching
    // For now, we'll use dummy data
    setLoading(true);
    
    const dummyBarbers: Barber[] = [
      {
        id: '1',
        email: 'john@barbershop.com',
        name: 'John Smith',
        role: 'barber',
        shopName: 'Classic Cuts',
        shopLocation: {
          address: '123 Main St, City Center',
          latitude: 0,
          longitude: 0,
        },
        services: [
          {
            id: '1',
            name: 'Haircut',
            description: 'Professional haircut',
            price: 25,
            duration: 30,
            category: 'Hair',
          },
          {
            id: '2',
            name: 'Beard Trim',
            description: 'Beard shaping and trim',
            price: 15,
            duration: 20,
            category: 'Beard',
          },
        ],
        workingHours: {
          monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
          tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
          wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
          thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
          friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
          saturday: { isOpen: true, openTime: '09:00', closeTime: '16:00' },
          sunday: { isOpen: false },
        },
        ratings: {
          average: 4.8,
          totalReviews: 156,
        },
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    setTimeout(() => {
      setBarbers(dummyBarbers);
      setLoading(false);
    }, 1000);
  };

  const handleBarberPress = (barberId: string) => {
    // Navigation will be implemented
    Alert.alert('Info', `Selected barber: ${barberId}`);
  };

  const renderBarberCard = ({ item }: { item: Barber }) => (
    <TouchableOpacity
      style={styles.barberCard}
      onPress={() => handleBarberPress(item.id)}
    >
      <View style={styles.barberInfo}>
        <Text style={styles.shopName}>{item.shopName}</Text>
        <Text style={styles.barberName}>{item.name}</Text>
        <Text style={styles.address}>{item.shopLocation.address}</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>
            {item.ratings.average} ({item.ratings.totalReviews} reviews)
          </Text>
        </View>
        
        <View style={styles.servicesContainer}>
          {item.services.slice(0, 2).map(service => (
            <Text key={service.id} style={styles.serviceTag}>
              {service.name} - ₹{service.price}
            </Text>
          ))}
        </View>
      </View>
      
      {item.isVerified && (
        <View style={styles.verifiedBadge}>
          <Icon name="verified" size={20} color="#4CAF50" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'Customer'}!</Text>
        <Text style={styles.subtitle}>Find your perfect barber</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search barbers or services..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Barbers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading barbers...</Text>
          </View>
        ) : (
          <FlatList
            data={barbers}
            renderItem={renderBarberCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B4423',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginTop: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  seeAll: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
  },
  barberCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  barberInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  barberName: {
    fontSize: 16,
    color: '#6B4423',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#6B4423',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#6B4423',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
});

export default HomeScreen;