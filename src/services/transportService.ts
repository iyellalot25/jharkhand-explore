import { TransportSchedule, TransportStation, TransportRoute } from '@/types/transport'

// Mock data for demonstration - replace with real API calls
const mockStations: TransportStation[] = [
  {
    id: '1',
    name: 'Ranchi Railway Station',
    code: 'RNC',
    type: 'railway',
    location: 'Ranchi',
    latitude: 23.3441,
    longitude: 85.3096
  },
  {
    id: '2',
    name: 'Hatia Railway Station',
    code: 'HTE',
    type: 'railway',
    location: 'Ranchi',
    latitude: 23.2979,
    longitude: 85.3218
  },
  {
    id: '3',
    name: 'Tatanagar Railway Station (Jamshedpur)',
    code: 'TATA',
    type: 'railway',
    location: 'Jamshedpur',
    latitude: 22.8046,
    longitude: 86.2029
  },
  {
    id: '4',
    name: 'Dhanbad Railway Station',
    code: 'DHN',
    type: 'railway',
    location: 'Dhanbad',
    latitude: 23.7957,
    longitude: 86.4304
  },
  {
    id: '5',
    name: 'Patna Junction',
    code: 'PNBE',
    type: 'railway',
    location: 'Patna',
    latitude: 25.6093,
    longitude: 85.1235
  },
  {
    id: '6',
    name: 'Ranchi Bus Stand',
    code: 'RNB',
    type: 'bus',
    location: 'Ranchi',
    latitude: 23.3700,
    longitude: 85.3250
  },
  {
    id: '7',
    name: 'Jamshedpur Bus Stand',
    code: 'JMB',
    type: 'bus',
    location: 'Jamshedpur',
    latitude: 22.8046,
    longitude: 86.2029
  },
  {
    id: '8',
    name: 'Netarhat Bus Stand',
    code: 'NTR',
    type: 'bus',
    location: 'Netarhat',
    latitude: 23.4833,
    longitude: 84.2667
  },
  {
    id: '9',
    name: 'Dhanbad Bus Stand',
    code: 'DHB',
    type: 'bus',
    location: 'Dhanbad',
    latitude: 23.7957,
    longitude: 86.4304
  }
]

const mockSchedules: TransportSchedule[] = [
  {
    id: '1',
    transportNumber: '18625',
    transportName: 'Hatia - Patna Express',
    transportType: 'train',
    fromStation: 'HTE', // Hatia
    toStation: 'PNBE', // Patna
    departureTime: '06:00',
    arrivalTime: '14:30',
    duration: '8h 30m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fare: 450,
    availableSeats: 23,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    transportNumber: '18626', 
    transportName: 'Patna - Hatia Express',
    transportType: 'train',
    fromStation: 'PNBE', // Patna
    toStation: 'HTE', // Hatia
    departureTime: '15:30',
    arrivalTime: '23:45',
    duration: '8h 15m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fare: 450,
    availableSeats: 15,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    transportNumber: '13352',
    transportName: 'Dhanbad - Ranchi Intercity',
    transportType: 'train',
    fromStation: 'DHN', // Dhanbad
    toStation: 'RNC', // Ranchi
    departureTime: '08:15',
    arrivalTime: '14:45',
    duration: '6h 30m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A', 'CC'],
    fare: 320,
    availableSeats: 42,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    transportNumber: '13351',
    transportName: 'Ranchi - Dhanbad Intercity',
    transportType: 'train',
    fromStation: 'RNC', // Ranchi
    toStation: 'DHN', // Dhanbad
    departureTime: '15:30',
    arrivalTime: '22:00',
    duration: '6h 30m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A', 'CC'],
    fare: 320,
    availableSeats: 28,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    transportNumber: 'JH01',
    transportName: 'Ranchi - Jamshedpur AC Bus',
    transportType: 'bus',
    fromStation: 'RNB', // Ranchi Bus Stand
    toStation: 'JMB', // Jamshedpur Bus Stand
    departureTime: '07:00',
    arrivalTime: '12:30',
    duration: '5h 30m',
    runsOn: ['Daily'],
    fare: 600,
    availableSeats: 8,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '6',
    transportNumber: 'JH02',
    transportName: 'Jamshedpur - Ranchi AC Bus',
    transportType: 'bus',
    fromStation: 'JMB', // Jamshedpur Bus Stand
    toStation: 'RNB', // Ranchi Bus Stand
    departureTime: '14:00',
    arrivalTime: '19:30',
    duration: '5h 30m',
    runsOn: ['Daily'],
    fare: 600,
    availableSeats: 12,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '7',
    transportNumber: 'JH03',
    transportName: 'Ranchi - Netarhat Deluxe Bus',
    transportType: 'bus',
    fromStation: 'RNB', // Ranchi Bus Stand
    toStation: 'NTR', // Netarhat
    departureTime: '09:30',
    arrivalTime: '15:00',
    duration: '5h 30m',
    runsOn: ['Daily'],
    fare: 450,
    availableSeats: 15,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '8',
    transportNumber: 'JH04',
    transportName: 'Netarhat - Ranchi Deluxe Bus',
    transportType: 'bus',
    fromStation: 'NTR', // Netarhat
    toStation: 'RNB', // Ranchi Bus Stand
    departureTime: '16:00',
    arrivalTime: '21:30',
    duration: '5h 30m',
    runsOn: ['Daily'],
    fare: 450,
    availableSeats: 18,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  }
]

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const transportService = {
  // Get all stations
  getStations: async (): Promise<TransportStation[]> => {
    await delay(500)
    return mockStations
  },

  // Search stations by query
// Search stations by query - improved to show both code and name
searchStations: async (query: string): Promise<TransportStation[]> => {
  await delay(300)
  if (query.length < 2) return []
  
  const queryLower = query.toLowerCase()
  return mockStations.filter(station =>
    station.name.toLowerCase().includes(queryLower) ||
    station.code.toLowerCase().includes(queryLower) ||
    station.location.toLowerCase().includes(queryLower)
  )
},

  // Get schedules between stations
// Get schedules between stations - UPDATED to handle both codes and names
getSchedules: async (from: string, to: string, date: string): Promise<TransportSchedule[]> => {
  await delay(800)
  
  // Convert to uppercase for case-insensitive matching
  const fromUpper = from.toUpperCase()
  const toUpper = to.toUpperCase()
  
  // First, try to find station codes if names were entered
  let fromCode = fromUpper
  let toCode = toUpper
  
  // Check if input matches any station names and get the code
  const fromStation = mockStations.find(station => 
    station.name.toUpperCase().includes(fromUpper) || 
    station.code.toUpperCase() === fromUpper
  )
  
  const toStation = mockStations.find(station => 
    station.name.toUpperCase().includes(toUpper) || 
    station.code.toUpperCase() === toUpper
  )
  
  if (fromStation) fromCode = fromStation.code.toUpperCase()
  if (toStation) toCode = toStation.code.toUpperCase()
  
  console.log('Searching for:', fromUpper, '→', toUpper, '(resolved to:', fromCode, '→', toCode, ')')
  
  // Find matching schedules using the resolved codes
  const matchingSchedules = mockSchedules.filter(schedule => {
    const scheduleFrom = schedule.fromStation.toUpperCase()
    const scheduleTo = schedule.toStation.toUpperCase()
    
    return scheduleFrom === fromCode && scheduleTo === toCode
  })
  
  console.log('Found', matchingSchedules.length, 'matching schedules')
  
  return matchingSchedules.map(schedule => ({
    ...schedule,
    // Simulate real-time status updates
    status: Math.random() > 0.8 ? 'delayed' : 'scheduled',
    delay: Math.random() > 0.8 ? Math.floor(Math.random() * 30) : undefined,
    availableSeats: Math.floor(Math.random() * 50)
  }))
},

  // Get schedule by ID
  getSchedule: async (id: string): Promise<TransportSchedule | null> => {
    await delay(400)
    return mockSchedules.find(schedule => schedule.id === id) || null
  },

  // Get live status of a transport
  getLiveStatus: async (transportNumber: string): Promise<{ status: string; delay?: number; lastUpdated: string }> => {
    await delay(600)
    return {
      status: Math.random() > 0.7 ? 'on-time' : 'delayed',
      delay: Math.random() > 0.7 ? Math.floor(Math.random() * 45) : undefined,
      lastUpdated: new Date().toISOString()
    }
  },

  // Book transport
  bookTransport: async (scheduleId: string, passengerDetails: any): Promise<{ success: boolean; bookingId?: string; error?: string }> => {
    await delay(1200)
    // Simulate booking process
    const success = Math.random() > 0.2 // 80% success rate
    return {
      success,
      bookingId: success ? `BK${Date.now()}` : undefined,
      error: success ? undefined : 'No seats available'
    }
  }
}

// Real API integration functions (replace with actual API calls)
export const realTimeAPIs = {
  // Indian Railways API integration
  getIndianRailwaysSchedule: async (from: string, to: string, date: string) => {
    // This would be replaced with actual Indian Railways API call
    try {
      // Example: const response = await fetch(`https://api.railwayapi.com/v2/between/source/${from}/dest/${to}/date/${date}/apikey/YOUR_API_KEY`)
      // return await response.json()
      return { trains: [] }
    } catch (error) {
      console.error('Railway API error:', error)
      return { trains: [] }
    }
  },

  // State transport bus API integration
  getJharkhandBusSchedule: async (from: string, to: string, date: string) => {
    // This would be replaced with actual Jharkhand Transport API call
    try {
      // Example: const response = await fetch(`https://jharkhandtransport.gov.in/api/buses?from=${from}&to=${to}&date=${date}`)
      // return await response.json()
      return { buses: [] }
    } catch (error) {
      console.error('Bus API error:', error)
      return { buses: [] }
    }
  }
}