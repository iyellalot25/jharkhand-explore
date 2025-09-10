'use client'

import { useEffect, useState } from 'react'
import DestinationCard from '@/components/DestinationCard'
import { Destination } from '@/types/database'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedCard from '@/components/AnimatedCard'

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        if (!response.ok) throw new Error('Failed to fetch destinations')
        const data = await response.json()
        setDestinations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🌄 Explore Jharkhand
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the hidden gems of Jharkhand with our curated list of must-visit destinations. 
            From stunning waterfalls to rich cultural heritage, experience the best of this beautiful state.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <AnimatedCard key={destination.id} index={index}>
              <DestinationCard destination={destination} />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  )
}