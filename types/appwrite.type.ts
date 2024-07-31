import { Models } from "node-appwrite";

export interface Consumer extends Models.Document {
  email: string; // Email type required
  phone: string; // String type required
  userId: string; // String type required
  name: string; // String type required
  address: string; // String type
  city: string; // String type
  state: string; // String type
  zipcode: string; // String type
  createon: Date; // Datetime type
  bookings: string[]; // Array of strings
  userType: 'Consumer'; // Enum type required
  profileImg: string; // URL type
}
export interface ServiceCardProps {
  title: string;
  summary: string;
  description: string;
  price: number;
  providerName: string;
  providerId: string;
  category: string;
  onClick?: () => void;
  onViewProfile?: () => void; // Optional prop for viewing profile
  onProviderClick?: () => void; // prop for provider click
}
export interface Service {
  $id: string;
  name: string;
  description: string;
  price: number;
  providerId: string;
  providerName: string;
  category: string;
  city: string;
  zipcode: string;
}
export interface Provider extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  bookings: string[];
  address: string;
  city: string;
  state: string;
  zipcode: string;
  createdAt: Date;
  ratings: Int8Array;
  userType: 'Provider';
  unavailableDates: string[];
  availableDates: string [] // an array of Json strings { date: string; startTime: string; endTime: string }
  services: string[];
  profileImge: string;
  credits: number;
  // availability: Availability[];
}

export interface Booking extends Models.Document {
  bookingId: string;
  consumerId: string;
  providerId: string;
  serviceId: string;
  date: Date;
  status: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface BookingCardProps {
  booking: Booking;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface BookingFormProps {
  providerId: string;
  serviceId: string;
}

export interface Availability extends Models.Document {
  date: string; // ISO string format required
  startTime: string; // "HH:mm" format required
  endTime: string; // "HH:mm" format required
  recurring: boolean; // Boolean type not required, and default False
  providerId: string;  // String type required
  serviceProvider: string; // String type required
}
