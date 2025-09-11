'use client'

import { useState } from 'react'
import { TransportSchedule } from '@/types/transport'
import TransportBookingModal from './TransportBookingModal'

interface TransportScheduleCardProps {
  schedule: TransportSchedule
}

export default function TransportScheduleCard({ schedule }: TransportScheduleCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      delayed: 'bg-yellow-100 text-yellow-800',
      departed: 'bg-green-100 text-green-800',
      arrived: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTransportIcon = (type: string) => {
    return type === 'train' ? '🚆' : '🚌'
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTransportIcon(schedule.transportType)}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {schedule.transportName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {schedule.transportNumber} • {schedule.transportType.toUpperCase()}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
            {schedule.status.toUpperCase()}
            {schedule.delay && ` (${schedule.delay}m late)`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">From</p>
            <p className="font-semibold text-gray-900 dark:text-white">{schedule.fromStation}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{schedule.departureTime}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
            <p className="font-semibold text-gray-900 dark:text-white">{schedule.duration}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-2 relative">
              <div className="absolute left-0 top-0 w-full h-1 bg-green-500"></div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">To</p>
            <p className="font-semibold text-gray-900 dark:text-white">{schedule.toStation}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{schedule.arrivalTime}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {schedule.fare && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fare from</p>
                <p className="font-bold text-green-600 dark:text-green-400">₹{schedule.fare}</p>
              </div>
            )}
            
            {schedule.availableSeats !== undefined && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Seats</p>
                <p className={`font-semibold ${schedule.availableSeats > 10 ? 'text-green-600 dark:text-green-400' : schedule.availableSeats > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                  {schedule.availableSeats > 0 ? `${schedule.availableSeats} available` : 'Waitlist'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            disabled={schedule.availableSeats === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
          >
            {schedule.availableSeats === 0 ? 'Check Waitlist' : 'Book Now'}
          </button>
        </div>
      </div>

      <TransportBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        schedule={schedule}
      />
    </>
  )
}