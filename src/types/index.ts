// Type definitions for Barber Booking App

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'barber' | 'customer';
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  bookingHistory?: string[];
}

export interface Barber extends User {
  role: 'barber';
  shopName: string;
  shopLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  services: Service[];
  workingHours: WorkingHours;
  ratings: {
    average: number;
    totalReviews: number;
  };
  earnings?: number;
  isVerified: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "18:00"
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  barberId: string;
  customerName: string;
  barberName: string;
  shopName: string;
  services: Service[];
  date: Date;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  appointmentId: string;
  customerId: string;
  barberId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  appointmentId: string;
  customerId: string;
  barberId: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed' | 'refunded';
  paymentMethod: 'razorpay';
  transactionId: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment_confirmed' | 'appointment_reminder' | 'appointment_cancelled' | 'payment_received' | 'review_received';
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  CustomerRegistration: undefined;
  BarberRegistration: undefined;
  Home: undefined;
  BarberProfile: { barberId: string };
  BookingFlow: { barberId: string };
  AppointmentDetails: { appointmentId: string };
  Profile: undefined;
  Settings: undefined;
  BarberDashboard: undefined;
  Earnings: undefined;
  Reviews: undefined;
  Payment: { appointmentId: string; amount: number };
};

export type TabParamList = {
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  Search: undefined;
  Dashboard: undefined;
};