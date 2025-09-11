'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TransportSchedule } from '@/types/transport'
import { transportService } from '@/services/transportService'

interface TransportBookingModalProps {
  isOpen: boolean
  onClose: () => void
  schedule: TransportSchedule
}

export default function TransportBookingModal({ isOpen, onClose, schedule }: TransportBookingModalProps) {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerAge: '',
    passengerGender: 'male',
    passengerEmail: '',
    passengerPhone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState<{ success: boolean; bookingId?: string; error?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await transportService.bookTransport(schedule.id, {
        ...formData,
        passengerAge: parseInt(formData.passengerAge)
      })
      
      setBookingResult(result)
    } catch (error) {
      setBookingResult({ success: false, error: 'Booking failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleClose = () => {
    setFormData({
      passengerName: '',
      passengerAge: '',
      passengerGender: 'male',
      passengerEmail: '',
      passengerPhone: ''
    })
    setBookingResult(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {!bookingResult ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Book {schedule.transportName}
                  </h2>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">From</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">To</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">{schedule.fromStation}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{schedule.toStation}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{schedule.departureTime}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{schedule.arrivalTime}</span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold">₹{schedule.fare}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="passengerName"
                        required
                        value={formData.passengerName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="passengerAge"
                          required
                          min="1"
                          max="100"
                          value={formData.passengerAge}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Gender *
                        </label>
                        <select
                          name="passengerGender"
                          required
                          value={formData.passengerGender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="passengerEmail"
                        required
                        value={formData.passengerEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="passengerPhone"
                        required
                        value={formData.passengerPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                      >
                        {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  {bookingResult.success ? (
                    <>
                      <div className="text-green-500 text-5xl mb-4">✅</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Booking Confirmed!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your booking ID: <span className="font-mono font-bold">{bookingResult.bookingId}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Details have been sent to your email and phone number.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-red-500 text-5xl mb-4">❌</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Booking Failed
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {bookingResult.error}
                      </p>
                    </>
                  )}
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {bookingResult.success ? 'Done' : 'Try Again'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}