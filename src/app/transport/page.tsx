'use client'

import { useState } from 'react'
import TransportSearch from '@/components/TransportSearch'
import BookingsList from '@/components/BookingsList'
import AnimatedSection from '@/components/AnimatedSection'

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'bookings' | 'info'>('search')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
            🚆 Transport Services
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Book trains and buses across Jharkhand. Real-time schedules and availability.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.2}>
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'search'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Search & Book
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'info'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Travel Info
            </button>
          </div>
        </AnimatedSection>

        {/* Tab Content */}
        <AnimatedSection delay={0.3}>
          {activeTab === 'search' && <TransportSearch />}
          
          {activeTab === 'bookings' && <BookingsList />}
          
          {activeTab === 'info' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Travel Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🚆 Train Travel</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Indian Railways connects all major cities</li>
                    <li>• Book tickets 120 days in advance</li>
                    <li>• Tatkal booking opens at 10 AM</li>
                    <li>• Senior citizens get 40-50% discount</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🚌 Bus Travel</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Jharkhand State Transport buses available</li>
                    <li>• Private operators with AC/Non-AC options</li>
                    <li>• Online booking available</li>
                    <li>• Student discounts available</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Important Tips</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Carry valid ID proof during travel</li>
                  <li>• Arrive at station 30 minutes before departure</li>
                  <li>• Check train/bus status before traveling</li>
                  <li>• Keep emergency contact numbers handy</li>
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}