import { LocalGuide, TransportService } from '@/types/database'

export const localGuides: LocalGuide[] = [
  {
    id: '1',
    name: 'Rajesh Munda',
    profile_image: 'https://images.unsplash.com/photo-1644459440346-c4462c40347f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'nature',
    languages: ['Hindi', 'English', 'Mundari'],
    experience_years: 8,
    rating: 4.9,
    review_count: 127,
    hourly_rate: 800,
    description: 'Expert nature guide specializing in Netarhat and Betla National Park. Born and raised in Jharkhand with deep knowledge of local flora and fauna.',
    contact_number: '+91 9876543210',
    email: 'rajesh.munda@example.com',
    verified: true,
    location: 'Netarhat',
    services: ['Jungle Safari', 'Bird Watching', 'Nature Walks', 'Photography Tours'],
    created_at: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sunita Devi',
    profile_image: 'https://images.unsplash.com/photo-1711060266352-3ac811e61888?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'culture',
    languages: ['Hindi', 'English', 'Santhali'],
    experience_years: 6,
    rating: 4.8,
    review_count: 89,
    hourly_rate: 700,
    description: 'Cultural expert with extensive knowledge of tribal traditions, handicrafts, and local festivals. Great for immersive cultural experiences.',
    contact_number: '+91 9876543211',
    email: 'sunita.devi@example.com',
    verified: true,
    location: 'Ranchi',
    services: ['Tribal Village Tours', 'Handicraft Workshops', 'Cultural Shows', 'Local Cuisine'],
    created_at: '2024-02-20'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    profile_image: 'https://images.unsplash.com/photo-1587060536793-ccc20ec6a23d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'adventure',
    languages: ['Hindi', 'English'],
    experience_years: 10,
    rating: 4.7,
    review_count: 156,
    hourly_rate: 1000,
    description: 'Adventure specialist with expertise in waterfall rappelling, trekking, and outdoor activities. Certified safety instructor.',
    contact_number: '+91 9876543212',
    email: 'vikram.singh@example.com',
    verified: true,
    location: 'Hundru Falls',
    services: ['Waterfall Rappelling', 'Trekking', 'Adventure Sports', 'Safety Training'],
    created_at: '2024-01-10'
  }
]

export const transportServices: TransportService[] = [
  {
    id: '1',
    name: 'Jharkhand Green Cabs',
    service_type: 'taxi',
    vehicle_type: 'SUV',
    capacity: 6,
    rate_per_km: 15,
    rating: 4.6,
    review_count: 203,
    contact_number: '+91 9876543213',
    verified: true,
    location: 'Ranchi',
    description: 'Reliable taxi service with experienced drivers who know all tourist routes. Eco-friendly vehicles available.',
    available: true,
    created_at: '2024-01-05'
  },
  {
    id: '2',
    name: 'Nature Trail Bikes',
    service_type: 'bike_rental',
    vehicle_type: 'Mountain Bike',
    capacity: 1,
    rate_per_day: 500,
    rating: 4.8,
    review_count: 78,
    contact_number: '+91 9876543214',
    verified: true,
    location: 'Netarhat',
    description: 'Mountain bike rentals for exploring hilly terrains. Well-maintained bikes with safety gear included.',
    available: true,
    created_at: '2024-02-15'
  },
  {
    id: '3',
    name: 'Comfort Travels',
    service_type: 'tour_vehicle',
    vehicle_type: 'Innova',
    capacity: 7,
    rate_per_day: 3500,
    rating: 4.7,
    review_count: 134,
    contact_number: '+91 9876543215',
    verified: true,
    location: 'Ranchi',
    description: 'Comfortable tour vehicles with experienced drivers for long-distance travel across Jharkhand.',
    available: true,
    created_at: '2024-01-20'
  }
]