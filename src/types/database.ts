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