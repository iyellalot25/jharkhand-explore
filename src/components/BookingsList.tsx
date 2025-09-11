'use client'

import { useState, useEffect } from 'react'
import { TransportBooking } from '@/types/transport'
import { bookingService } from '@/services/bookingService'

export default function BookingsList() {
  const [bookings, setBookings] = useState<TransportBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedBookings = bookingService.getBookings()
    setBookings(storedBookings)
    setLoading(false)
  }, [])

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = bookingService.cancelBooking(bookingId)
      if (success) {
        setBookings(bookingService.getBookings())
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      waiting: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Bookings Yet
        </h3>
        <p className="text-gray-600 mb-4">
          You haven't made any transport bookings yet.
        </p>
        <p className="text-sm text-gray-500">
          Book your first journey to see it here!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          My Transport Bookings ({bookings.length})
        </h2>
        <button
          onClick={() => {
            if (window.confirm('Clear all bookings? This cannot be undone.')) {
              bookingService.clearBookings()
              setBookings([])
            }
          }}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.transportName}
                </h3>
                <p className="text-sm text-gray-600">
                  {booking.transportNumber} • {booking.transportType.toUpperCase()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold text-gray-900">
                  {booking.fromStation} → {booking.toStation}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Travel Date</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(booking.travelDate)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Timing</p>
                <p className="font-semibold text-gray-900">
                  {booking.departureTime} - {booking.arrivalTime}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Passenger</p>
                <p className="font-semibold text-gray-900">
                  {booking.passengerName} ({booking.passengerAge} yrs)
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="font-mono text-sm text-gray-900">{booking.bookingId}</p>
                {booking.seatNumber && (
                  <>
                    <p className="text-sm text-gray-600 mt-1">Seat Number</p>
                    <p className="font-semibold text-green-600">{booking.seatNumber}</p>
                  </>
                )}
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Fare</p>
                <p className="text-xl font-bold text-green-600">₹{booking.fare}</p>
                <p className="text-xs text-gray-500">
                  Booked on {formatDate(booking.bookingDate)}
                </p>
              </div>
            </div>

            {booking.status === 'confirmed' && (
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-8">
        <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Note</h4>
        <p className="text-sm text-blue-700">
          These bookings are stored locally in your browser. They will persist until you clear your browser data or use the "Clear All" button.
          This is a demonstration feature and not connected to real booking systems.
        </p>
      </div>
    </div>
  )
}