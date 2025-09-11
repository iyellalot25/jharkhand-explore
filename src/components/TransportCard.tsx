import Image from 'next/image'
import { TransportService } from '@/types/database'
import BookingModal from './BookingModal'
import { useState } from 'react'

interface TransportCardProps {
  transport: TransportService
}

export default function TransportCard({ transport }: TransportCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const getServiceTypeColor = (type: string) => {
    const colors = {
      taxi: 'bg-blue-100 text-blue-800',
      rental: 'bg-green-100 text-green-800',
      tour_vehicle: 'bg-purple-100 text-purple-800',
      bike_rental: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getRateText = () => {
    if (transport.rate_per_km) return `₹${transport.rate_per_km}/km`
    if (transport.rate_per_hour) return `₹${transport.rate_per_hour}/hour`
    if (transport.rate_per_day) return `₹${transport.rate_per_day}/day`
    return 'Contact for rates'
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🚗</span>
          </div>
          {transport.verified && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
              ✅ Verified
            </div>
          )}
          {!transport.available && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              ❌ Unavailable
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {transport.name}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ⭐ {transport.rating} ({transport.review_count})
            </span>
          </div>

          <div className="flex items-center mb-3">
            <span className={`px-2 py-1 rounded-full text-xs ${getServiceTypeColor(transport.service_type)}`}>
              {transport.service_type.replace('_', ' ').toUpperCase()}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {transport.vehicle_type} • {transport.capacity} seats
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {transport.description}
          </p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-green-600">
              {getRateText()}
            </span>
            <span className="text-sm text-gray-500">
              📍 {transport.location}
            </span>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            disabled={!transport.available}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
          >
            {transport.available ? 'Book Now' : 'Not Available'}
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="transport"
        serviceId={transport.id}
        serviceName={transport.name}
      />
    </>
  )
}