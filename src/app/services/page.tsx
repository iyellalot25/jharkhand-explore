'use client'

import { useState } from 'react'
import GuideCard from '@/components/GuideCard'
import TransportCard from '@/components/TransportCard'
import AnimatedSection from '@/components/AnimatedSection'
import { localGuides, transportServices } from '@/data/localServices'

type ServiceType = 'all' | 'guides' | 'transport'
type GuideSpecialty = 'all' | 'nature' | 'culture' | 'adventure' | 'wildlife' | 'photography'
type TransportType = 'all' | 'taxi' | 'rental' | 'tour_vehicle' | 'bike_rental'

export default function ServicesPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('all')
  const [selectedGuideSpecialty, setSelectedGuideSpecialty] = useState<GuideSpecialty>('all')
  const [selectedTransportType, setSelectedTransportType] = useState<TransportType>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGuides = localGuides.filter(guide => {
    const matchesServiceType = selectedServiceType === 'all' || selectedServiceType === 'guides'
    const matchesSpecialty = selectedGuideSpecialty === 'all' || guide.specialty === selectedGuideSpecialty
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesServiceType && matchesSpecialty && matchesSearch
  })

  const filteredTransport = transportServices.filter(transport => {
    const matchesServiceType = selectedServiceType === 'all' || selectedServiceType === 'transport'
    const matchesTransportType = selectedTransportType === 'all' || transport.service_type === selectedTransportType
    const matchesSearch = transport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transport.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transport.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesServiceType && matchesTransportType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🧭 Verified Local Services
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Connect with trusted local guides and transportation services in Jharkhand. 
            All services are verified for quality and reliability.
          </p>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection delay={0.2}>
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search guides or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
              />
            </div>

            {/* Service Type Filters */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'guides', 'transport'] as ServiceType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedServiceType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedServiceType === type
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type === 'all' ? 'All Services' : type === 'guides' ? 'Guides' : 'Transport'}
                </button>
              ))}
            </div>

            {/* Guide Specialty Filters */}
            {(selectedServiceType === 'all' || selectedServiceType === 'guides') && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">Guide Specialty:</span>
                {(['all', 'nature', 'culture', 'adventure', 'wildlife', 'photography'] as GuideSpecialty[]).map(specialty => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedGuideSpecialty(specialty)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedGuideSpecialty === specialty
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {specialty === 'all' ? 'All' : specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Transport Type Filters */}
            {(selectedServiceType === 'all' || selectedServiceType === 'transport') && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">Transport Type:</span>
                {(['all', 'taxi', 'rental', 'tour_vehicle', 'bike_rental'] as TransportType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedTransportType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTransportType === type
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'all' ? 'All' : type.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection delay={0.3}>
          {/* Guides Section */}
          {(selectedServiceType === 'all' || selectedServiceType === 'guides') && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Local Guides ({filteredGuides.length})
              </h2>
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide, index) => (
                    <GuideCard key={guide.id} guide={guide} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">No guides found matching your criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Transport Section */}
          {(selectedServiceType === 'all' || selectedServiceType === 'transport') && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Transport Services ({filteredTransport.length})
              </h2>
              {filteredTransport.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTransport.map((transport, index) => (
                    <TransportCard key={transport.id} transport={transport} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">No transport services found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              Why Choose Verified Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">✅</div>
                <h3 className="font-semibold mb-2">Quality Verified</h3>
                <p className="text-gray-600 text-sm">All services undergo thorough verification process</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">💰</div>
                <h3 className="font-semibold mb-2">Fair Pricing</h3>
                <p className="text-gray-600 text-sm">Transparent pricing with no hidden charges</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">🌍</div>
                <h3 className="font-semibold mb-2">Local Expertise</h3>
                <p className="text-gray-600 text-sm">Genuine local knowledge and authentic experiences</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* How It Works */}
        <AnimatedSection delay={0.5}>
          <div className="mt-12 bg-green-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Browse</h3>
                <p className="text-gray-600 text-sm">Explore verified guides and services</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Select</h3>
                <p className="text-gray-600 text-sm">Choose the service that fits your needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Book</h3>
                <p className="text-gray-600 text-sm">Send a booking request with your details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Enjoy</h3>
                <p className="text-gray-600 text-sm">The provider will contact you to confirm</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}