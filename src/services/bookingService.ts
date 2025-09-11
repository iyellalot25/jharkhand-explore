import { TransportBooking } from '@/types/transport'

const BOOKINGS_KEY = 'jharkhand_transport_bookings'

export const bookingService = {
  // Get all bookings from localStorage
  getBookings: (): TransportBooking[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const bookingsJson = localStorage.getItem(BOOKINGS_KEY)
      return bookingsJson ? JSON.parse(bookingsJson) : []
    } catch (error) {
      console.error('Error reading bookings from localStorage:', error)
      return []
    }
  },

  // Save a new booking to localStorage
  saveBooking: (booking: Omit<TransportBooking, 'id'>): TransportBooking => {
    const bookings = bookingService.getBookings()
    const newBooking: TransportBooking = {
      ...booking,
      id: Date.now().toString() // Simple ID generation
    }
    
    const updatedBookings = [...bookings, newBooking]
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
    
    return newBooking
  },

  // Cancel a booking
  cancelBooking: (bookingId: string): boolean => {
    const bookings = bookingService.getBookings()
    const bookingIndex = bookings.findIndex(b => b.id === bookingId)
    
    if (bookingIndex === -1) return false
    
    const updatedBookings = [...bookings]
    updatedBookings[bookingIndex] = {
      ...updatedBookings[bookingIndex],
      status: 'cancelled'
    }
    
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
    return true
  },

  // Clear all bookings (for testing)
  clearBookings: (): void => {
    localStorage.removeItem(BOOKINGS_KEY)
  }
}