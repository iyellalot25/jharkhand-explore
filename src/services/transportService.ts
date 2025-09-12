import { TransportSchedule, TransportStation, TransportRoute } from '@/types/transport'

// Mock data for demonstration - replace with real API calls
const mockStations: TransportStation[] = [
  // Railway Stations
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
    name: 'Bokaro Steel City Railway Station',
    code: 'BKSC',
    type: 'railway',
    location: 'Bokaro',
    latitude: 23.6693,
    longitude: 86.1511
  },
  {
    id: '7',
    name: 'Jharsuguda Junction',
    code: 'JSG',
    type: 'railway',
    location: 'Jharsuguda',
    latitude: 21.8554,
    longitude: 84.0062
  },
  {
    id: '8',
    name: 'Gomoh Junction',
    code: 'GMO',
    type: 'railway',
    location: 'Dhanbad',
    latitude: 23.8735,
    longitude: 86.1726
  },
  {
    id: '9',
    name: 'Hazaribagh Road Railway Station',
    code: 'HZD',
    type: 'railway',
    location: 'Hazaribagh',
    latitude: 23.9928,
    longitude: 85.3688
  },
  {
    id: '10',
    name: 'Gaya Junction',
    code: 'GAYA',
    type: 'railway',
    location: 'Gaya',
    latitude: 24.7969,
    longitude: 85.0009
  },
  
  // Bus Stations
  {
    id: '11',
    name: 'Ranchi Bus Stand',
    code: 'RNB',
    type: 'bus',
    location: 'Ranchi',
    latitude: 23.3700,
    longitude: 85.3250
  },
  {
    id: '12',
    name: 'Jamshedpur Bus Stand',
    code: 'JMB',
    type: 'bus',
    location: 'Jamshedpur',
    latitude: 22.8046,
    longitude: 86.2029
  },
  {
    id: '13',
    name: 'Netarhat Bus Stand',
    code: 'NTR',
    type: 'bus',
    location: 'Netarhat',
    latitude: 23.4833,
    longitude: 84.2667
  },
  {
    id: '14',
    name: 'Dhanbad Bus Stand',
    code: 'DHB',
    type: 'bus',
    location: 'Dhanbad',
    latitude: 23.7957,
    longitude: 86.4304
  },
  {
    id: '15',
    name: 'Bokaro Bus Stand',
    code: 'BKB',
    type: 'bus',
    location: 'Bokaro',
    latitude: 23.6693,
    longitude: 86.1511
  },
  {
    id: '16',
    name: 'Hazaribagh Bus Stand',
    code: 'HZB',
    type: 'bus',
    location: 'Hazaribagh',
    latitude: 23.9928,
    longitude: 85.3688
  },
  {
    id: '17',
    name: 'Deoghar Bus Stand',
    code: 'DGB',
    type: 'bus',
    location: 'Deoghar',
    latitude: 24.4823,
    longitude: 86.7000
  },
  {
    id: '18',
    name: 'Giridih Bus Stand',
    code: 'GRB',
    type: 'bus',
    location: 'Giridih',
    latitude: 24.1870,
    longitude: 86.3150
  },
  {
    id: '19',
    name: 'Dumka Bus Stand',
    code: 'DMB',
    type: 'bus',
    location: 'Dumka',
    latitude: 24.2679,
    longitude: 87.2485
  },
  {
    id: '20',
    name: 'Gaya Bus Stand',
    code: 'GYB',
    type: 'bus',
    location: 'Gaya',
    latitude: 24.7969,
    longitude: 85.0009
  }
]

const mockSchedules: TransportSchedule[] = [
  // Trains
  {
    id: '1',
    transportNumber: '18625',
    transportName: 'Hatia - Patna Express',
    transportType: 'train',
    fromStation: 'HTE',
    toStation: 'PNBE',
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
    fromStation: 'PNBE',
    toStation: 'HTE',
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
    fromStation: 'DHN',
    toStation: 'RNC',
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
    fromStation: 'RNC',
    toStation: 'DHN',
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
    transportNumber: '18102',
    transportName: 'Tatanagar - Ranchi Express',
    transportType: 'train',
    fromStation: 'TATA',
    toStation: 'RNC',
    departureTime: '07:30',
    arrivalTime: '12:15',
    duration: '4h 45m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fare: 280,
    availableSeats: 35,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '6',
    transportNumber: '18101',
    transportName: 'Ranchi - Tatanagar Express',
    transportType: 'train',
    fromStation: 'RNC',
    toStation: 'TATA',
    departureTime: '14:00',
    arrivalTime: '18:45',
    duration: '4h 45m',
    runsOn: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fare: 280,
    availableSeats: 22,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '7',
    transportNumber: '18621',
    transportName: 'Hatia - Gomoh Express',
    transportType: 'train',
    fromStation: 'HTE',
    toStation: 'GMO',
    departureTime: '09:15',
    arrivalTime: '14:30',
    duration: '5h 15m',
    runsOn: ['Daily'],
    classes: ['SL', '3A'],
    fare: 210,
    availableSeats: 18,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '8',
    transportNumber: '18622',
    transportName: 'Gomoh - Hatia Express',
    transportType: 'train',
    fromStation: 'GMO',
    toStation: 'HTE',
    departureTime: '16:00',
    arrivalTime: '21:15',
    duration: '5h 15m',
    runsOn: ['Daily'],
    classes: ['SL', '3A'],
    fare: 210,
    availableSeats: 25,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '9',
    transportNumber: '58301',
    transportName: 'Ranchi - Hazaribagh Passenger',
    transportType: 'train',
    fromStation: 'RNC',
    toStation: 'HZD',
    departureTime: '06:30',
    arrivalTime: '10:45',
    duration: '4h 15m',
    runsOn: ['Daily'],
    classes: ['SL', 'GEN'],
    fare: 95,
    availableSeats: 120,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '10',
    transportNumber: '58302',
    transportName: 'Hazaribagh - Ranchi Passenger',
    transportType: 'train',
    fromStation: 'HZD',
    toStation: 'RNC',
    departureTime: '15:00',
    arrivalTime: '19:15',
    duration: '4h 15m',
    runsOn: ['Daily'],
    classes: ['SL', 'GEN'],
    fare: 95,
    availableSeats: 110,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '11',
    transportNumber: '12327',
    transportName: 'Dhanbad - Gaya Intercity',
    transportType: 'train',
    fromStation: 'DHN',
    toStation: 'GAYA',
    departureTime: '07:45',
    arrivalTime: '12:30',
    duration: '4h 45m',
    runsOn: ['Daily'],
    classes: ['SL', 'CC'],
    fare: 180,
    availableSeats: 38,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '12',
    transportNumber: '12328',
    transportName: 'Gaya - Dhanbad Intercity',
    transportType: 'train',
    fromStation: 'GAYA',
    toStation: 'DHN',
    departureTime: '14:15',
    arrivalTime: '19:00',
    duration: '4h 45m',
    runsOn: ['Daily'],
    classes: ['SL', 'CC'],
    fare: 180,
    availableSeats: 42,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  
  // Buses
  {
    id: '13',
    transportNumber: 'JH01',
    transportName: 'Ranchi - Jamshedpur AC Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'JMB',
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
    id: '14',
    transportNumber: 'JH02',
    transportName: 'Jamshedpur - Ranchi AC Bus',
    transportType: 'bus',
    fromStation: 'JMB',
    toStation: 'RNB',
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
    id: '15',
    transportNumber: 'JH03',
    transportName: 'Ranchi - Netarhat Deluxe Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'NTR',
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
    id: '16',
    transportNumber: 'JH04',
    transportName: 'Netarhat - Ranchi Deluxe Bus',
    transportType: 'bus',
    fromStation: 'NTR',
    toStation: 'RNB',
    departureTime: '16:00',
    arrivalTime: '21:30',
    duration: '5h 30m',
    runsOn: ['Daily'],
    fare: 450,
    availableSeats: 18,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '17',
    transportNumber: 'JH05',
    transportName: 'Ranchi - Dhanbad Express Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'DHB',
    departureTime: '08:00',
    arrivalTime: '14:30',
    duration: '6h 30m',
    runsOn: ['Daily'],
    fare: 500,
    availableSeats: 10,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '18',
    transportNumber: 'JH06',
    transportName: 'Dhanbad - Ranchi Express Bus',
    transportType: 'bus',
    fromStation: 'DHB',
    toStation: 'RNB',
    departureTime: '15:30',
    arrivalTime: '22:00',
    duration: '6h 30m',
    runsOn: ['Daily'],
    fare: 500,
    availableSeats: 14,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '19',
    transportNumber: 'JH07',
    transportName: 'Ranchi - Bokaro AC Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'BKB',
    departureTime: '10:00',
    arrivalTime: '14:30',
    duration: '4h 30m',
    runsOn: ['Daily'],
    fare: 400,
    availableSeats: 12,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '20',
    transportNumber: 'JH08',
    transportName: 'Bokaro - Ranchi AC Bus',
    transportType: 'bus',
    fromStation: 'BKB',
    toStation: 'RNB',
    departureTime: '16:00',
    arrivalTime: '20:30',
    duration: '4h 30m',
    runsOn: ['Daily'],
    fare: 400,
    availableSeats: 8,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '21',
    transportNumber: 'JH09',
    transportName: 'Ranchi - Hazaribagh Deluxe Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'HZB',
    departureTime: '08:30',
    arrivalTime: '12:30',
    duration: '4h 00m',
    runsOn: ['Daily'],
    fare: 350,
    availableSeats: 15,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '22',
    transportNumber: 'JH10',
    transportName: 'Hazaribagh - Ranchi Deluxe Bus',
    transportType: 'bus',
    fromStation: 'HZB',
    toStation: 'RNB',
    departureTime: '14:00',
    arrivalTime: '18:00',
    duration: '4h 00m',
    runsOn: ['Daily'],
    fare: 350,
    availableSeats: 12,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '23',
    transportNumber: 'JH11',
    transportName: 'Ranchi - Deoghar Express Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'DGB',
    departureTime: '07:30',
    arrivalTime: '14:00',
    duration: '6h 30m',
    runsOn: ['Daily'],
    fare: 550,
    availableSeats: 10,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '24',
    transportNumber: 'JH12',
    transportName: 'Deoghar - Ranchi Express Bus',
    transportType: 'bus',
    fromStation: 'DGB',
    toStation: 'RNB',
    departureTime: '15:00',
    arrivalTime: '21:30',
    duration: '6h 30m',
    runsOn: ['Daily'],
    fare: 550,
    availableSeats: 8,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '25',
    transportNumber: 'JH13',
    transportName: 'Ranchi - Dumka Ordinary Bus',
    transportType: 'bus',
    fromStation: 'RNB',
    toStation: 'DMB',
    departureTime: '09:00',
    arrivalTime: '16:30',
    duration: '7h 30m',
    runsOn: ['Daily'],
    fare: 300,
    availableSeats: 20,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '26',
    transportNumber: 'JH14',
    transportName: 'Dumka - Ranchi Ordinary Bus',
    transportType: 'bus',
    fromStation: 'DMB',
    toStation: 'RNB',
    departureTime: '08:00',
    arrivalTime: '15:30',
    duration: '7h 30m',
    runsOn: ['Daily'],
    fare: 300,
    availableSeats: 25,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '27',
    transportNumber: 'JH15',
    transportName: 'Dhanbad - Gaya Express Bus',
    transportType: 'bus',
    fromStation: 'DHB',
    toStation: 'GYB',
    departureTime: '08:30',
    arrivalTime: '13:30',
    duration: '5h 00m',
    runsOn: ['Daily'],
    fare: 400,
    availableSeats: 12,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '28',
    transportNumber: 'JH16',
    transportName: 'Gaya - Dhanbad Express Bus',
    transportType: 'bus',
    fromStation: 'GYB',
    toStation: 'DHB',
    departureTime: '14:30',
    arrivalTime: '19:30',
    duration: '5h 00m',
    runsOn: ['Daily'],
    fare: 400,
    availableSeats: 15,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '29',
    transportNumber: 'JH17',
    transportName: 'Jamshedpur - Dhanbad AC Bus',
    transportType: 'bus',
    fromStation: 'JMB',
    toStation: 'DHB',
    departureTime: '09:00',
    arrivalTime: '15:00',
    duration: '6h 00m',
    runsOn: ['Daily'],
    fare: 550,
    availableSeats: 8,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '30',
    transportNumber: 'JH18',
    transportName: 'Dhanbad - Jamshedpur AC Bus',
    transportType: 'bus',
    fromStation: 'DHB',
    toStation: 'JMB',
    departureTime: '16:00',
    arrivalTime: '22:00',
    duration: '6h 00m',
    runsOn: ['Daily'],
    fare: 550,
    availableSeats: 10,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '31',
    transportNumber: 'JH19',
    transportName: 'Bokaro - Jamshedpur Deluxe Bus',
    transportType: 'bus',
    fromStation: 'BKB',
    toStation: 'JMB',
    departureTime: '10:30',
    arrivalTime: '14:30',
    duration: '4h 00m',
    runsOn: ['Daily'],
    fare: 350,
    availableSeats: 12,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '32',
    transportNumber: 'JH20',
    transportName: 'Jamshedpur - Bokaro Deluxe Bus',
    transportType: 'bus',
    fromStation: 'JMB',
    toStation: 'BKB',
    departureTime: '15:30',
    arrivalTime: '19:30',
    duration: '4h 00m',
    runsOn: ['Daily'],
    fare: 350,
    availableSeats: 15,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '33',
    transportNumber: 'JH21',
    transportName: 'Hazaribagh - Dhanbad Express Bus',
    transportType: 'bus',
    fromStation: 'HZB',
    toStation: 'DHB',
    departureTime: '08:00',
    arrivalTime: '12:30',
    duration: '4h 30m',
    runsOn: ['Daily'],
    fare: 300,
    availableSeats: 14,
    status: 'scheduled',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '34',
    transportNumber: 'JH22',
    transportName: 'Dhanbad - Hazaribagh Express Bus',
    transportType: 'bus',
    fromStation: 'DHB',
    toStation: 'HZB',
    departureTime: '14:00',
    arrivalTime: '18:30',
    duration: '4h 30m',
    runsOn: ['Daily'],
    fare: 300,
    availableSeats: 10,
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