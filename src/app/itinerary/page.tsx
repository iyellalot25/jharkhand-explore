'use client'

import { useState } from 'react'
import ItineraryForm from '@/components/ItineraryForm'
import ItineraryDisplay from '@/components/ItineraryDisplay'
import AnimatedSection from '@/components/AnimatedSection'
import { motion } from 'framer-motion'

interface ItineraryData {
  days: number
  interests: string[]
  budget: string
  pace: string
}

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: ItineraryData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate itinerary')
      }

      const data = await response.json()
      setItinerary(data.itinerary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <motion.h1 
            className="text-4xl font-bold text-green-800 text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI-Powered Itinerary Planner
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Let our AI create the perfect Jharkhand itinerary tailored to your preferences. 
            Select your interests, budget, and travel style to get started.
          </motion.p>
        </AnimatedSection>

        {error && (
          <AnimatedSection>
            <motion.div 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Error: {error}
            </motion.div>
          </AnimatedSection>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <AnimatedSection delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ItineraryForm onSubmit={handleSubmit} loading={loading} />
            </motion.div>
          </AnimatedSection>

          {/* Results Section */}
          <AnimatedSection delay={0.6}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ItineraryDisplay itinerary={itinerary} loading={loading} />
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Sample Itineraries */}
        <AnimatedSection delay={0.8}>
          <div className="mt-16">
            <motion.h2 
              className="text-2xl font-semibold text-green-800 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Sample Itinerary Ideas
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🌿', title: 'Nature Lovers', desc: '3 days exploring waterfalls, national parks, and scenic valleys' },
                { icon: '🎭', title: 'Culture Explorer', desc: '4 days immersed in tribal heritage and traditional arts' },
                { icon: '⚡', title: 'Adventure Seeker', desc: '2 days of wildlife safaris and outdoor activities' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-green-700 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}