export interface TransportStation {
  id: string
  name: string
  code: string
  type: 'railway' | 'bus'
  location: string
  latitude: number
  longitude: number
}

export interface TransportSchedule {
  id: string
  transportNumber: string
  transportName: string
  transportType: 'train' | 'bus'
  fromStation: string
  toStation: string
  departureTime: string
  arrivalTime: string
  duration: string
  runsOn: string[]
  classes?: string[]
  fare?: number
  availableSeats?: number
  status: 'scheduled' | 'delayed' | 'departed' | 'arrived' | 'cancelled'
  delay?: number // in minutes
  lastUpdated: string
}

export interface TransportRoute {
  id: string
  fromStation: string
  toStation: string
  transportType: 'train' | 'bus'
  schedules: TransportSchedule[]
  distance?: number // in km
  duration?: string
}

export interface TransportBooking {
  id: string
  scheduleId: string
  transportNumber: string
  transportName: string
  fromStation: string
  toStation: string
  departureTime: string
  arrivalTime: string
  passengerName: string
  passengerAge: number
  passengerGender: string
  seatNumber?: string
  pnrNumber?: string
  fare: number
  status: 'confirmed' | 'waiting' | 'cancelled'
  bookingDate: string
}

export interface TransportBooking {
  id: string
  bookingId: string
  scheduleId: string
  transportNumber: string
  transportName: string
  transportType: 'train' | 'bus'
  fromStation: string
  toStation: string
  departureTime: string
  arrivalTime: string
  travelDate: string
  passengerName: string
  passengerAge: number
  passengerGender: string
  passengerEmail: string
  passengerPhone: string
  fare: number
  status: 'confirmed' | 'waiting' | 'cancelled'
  bookingDate: string
  seatNumber?: string
}