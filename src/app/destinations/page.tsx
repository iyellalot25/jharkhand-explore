'use client'

import { useEffect, useState } from 'react'
import DestinationCard from '@/components/DestinationCard'
import { Destination } from '@/types/database'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedCard from '@/components/AnimatedCard'
import OSMMap from '@/components/OSMMap'

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [searchTerm, setSearchTerm] = useState('') // ✅ new state for search

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

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination)
    setShowMap(true)
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleViewAllOnMap = () => {
    setSelectedDestination(null)
    setShowMap(true)

    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).initializeOSMMap) {
        (window as any).initializeOSMMap()
      }
    }, 100)

    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  // ✅ Filtered destinations
  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-800">Loading destinations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-600 bg-red-50 p-4 rounded-lg max-w-md mx-auto">
            <span className="font-medium">Error:</span> {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-green-800 text-center mb-4">
            🌄 Explore Jharkhand
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Discover the hidden gems of Jharkhand with our curated list of must-visit destinations. 
            From stunning waterfalls to rich cultural heritage, experience the best of this beautiful state.
          </p>
        </AnimatedSection>

        {/* ✅ Search Bar */}
        <AnimatedSection delay={0.25}>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="🔍 Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex justify-center mb-8">
            <button 
              onClick={handleViewAllOnMap}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <span>🗺️ View All on Map</span>
            </button>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.35}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination, index) => (
                <AnimatedCard key={destination.id} index={index}>
                  <DestinationCard 
                    destination={destination} 
                    onSelect={() => handleDestinationSelect(destination)}
                  />
                </AnimatedCard>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No destinations found.</p>
            )}
          </div>
        </AnimatedSection>

        {/* Map Section */}
        {destinations.length > 0 && (
          <section id="map-section" className="mb-12">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
                {selectedDestination ? `${selectedDestination.name} on Map` : 'Jharkhand Tourism Map'}
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <OSMMap 
                destinations={destinations} 
                selectedDestination={selectedDestination}
                className="rounded-lg shadow-md"
                autoInit={false}
              />
            </AnimatedSection>
          </section>
        )}

        {/* Additional Info */}
        <AnimatedSection>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">🌍 Plan Your Visit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-green-700 mb-2">Best Time to Visit</h3>
                <p className="text-gray-600 text-sm">
                  October to March is the ideal time to explore Jharkhand, when the weather is pleasant 
                  and perfect for sightseeing and outdoor activities.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-green-700 mb-2">Travel Tips</h3>
                <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                  <li>Carry water and snacks during treks</li>
                  <li>Respect local tribal customs and traditions</li>
                  <li>Wear comfortable shoes for exploring</li>
                  <li>Keep local emergency numbers handy</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
