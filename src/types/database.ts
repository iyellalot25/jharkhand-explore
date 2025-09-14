export interface Destination {
  id: string
  name: string
  description: string
  image_url: string
  location: string
  best_time_to_visit: string
  category: 'nature' | 'culture' | 'adventure' | 'religious'
  created_at: string
}

export interface Itinerary {
  id: string
  user_input: string
  generated_itinerary: string
  created_at: string
}

export interface ChatMessage {
  id: string
  question: string
  answer: string
  language: 'en' | 'hi'
  created_at: string
}

export interface ItineraryRequest {
  days: number
  interests: string[]
  budget: string
  pace: 'relaxed' | 'moderate' | 'fast'
}

export interface GeneratedItinerary {
  id: string
  user_input: ItineraryRequest
  generated_itinerary: string
  created_at: string
}

export interface LocalGuide {
  id: string
  name: string
  profile_image: string
  specialty: 'nature' | 'culture' | 'adventure' | 'wildlife' | 'photography'
  languages: string[]
  experience_years: number
  rating: number
  review_count: number
  hourly_rate: number
  description: string
  contact_number: string
  email: string
  verified: boolean
  location: string
  services: string[]
  created_at: string
}

export interface TransportService {
  id: string
  name: string
  service_type: 'taxi' | 'rental' | 'tour_vehicle' | 'bike_rental'
  vehicle_type: string
  capacity: number
  rate_per_km?: number
  rate_per_hour?: number
  rate_per_day?: number
  rating: number
  review_count: number
  contact_number: string
  verified: boolean
  location: string
  description: string
  available: boolean
  created_at: string
}

export interface BookingRequest {
  id: string
  service_type: 'guide' | 'transport'
  service_id: string
  user_name: string
  user_email: string
  user_phone: string
  booking_date: string
  duration: number
  participants?: number
  message: string
  status: 'pending' | 'confirmed' | 'rejected' | 'completed'
  created_at: string
}

export interface Festival {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  location: string
  category: 'tribal' | 'religious' | 'cultural' | 'harvest'
  image_url?: string
  significance: string
  activities: string[]
  is_public_holiday: boolean
}