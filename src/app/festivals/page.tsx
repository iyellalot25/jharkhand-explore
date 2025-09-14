'use client'

import { useState, useMemo } from 'react'
import FestivalCard from '@/components/FestivalCard'
import AnimatedSection from '@/components/AnimatedSection'
import { festivals } from '@/data/festivals'
import { Festival } from '@/types/database'

export default function FestivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tribal' | 'religious' | 'cultural' | 'harvest'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date')

  const filteredAndSortedFestivals = useMemo(() => {
    let filtered = festivals
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(festival => festival.category === selectedCategory)
    }
    
    // Sort by date or name
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      } else {
        return a.name.localeCompare(b.name)
      }
    })
    
    return filtered
  }, [selectedCategory, sortBy])

  const categories = [
    { value: 'all', label: 'All Festivals' },
    { value: 'tribal', label: 'Tribal' },
    { value: 'religious', label: 'Religious' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'harvest', label: 'Harvest' }
  ]

  const getUpcomingFestivals = () => {
    const today = new Date()
    return festivals.filter(festival => new Date(festival.start_date) >= today)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
      .slice(0, 3)
  }

  const upcomingFestivals = getUpcomingFestivals()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-orange-800 text-center mb-8">
            🎉 Jharkhand Festival Calendar
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the rich cultural heritage of Jharkhand through its vibrant festivals. 
            From tribal celebrations to religious ceremonies, experience the diversity of traditions.
          </p>
        </AnimatedSection>

        {/* Upcoming Festivals Section */}
        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📅 Upcoming Festivals</h2>
            {upcomingFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingFestivals.map((festival, index) => (
                  <FestivalCard key={festival.id} festival={festival} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No upcoming festivals. Check back later!</p>
            )}
          </div>
        </AnimatedSection>

        {/* Filters and Full Calendar */}
        <AnimatedSection delay={0.3}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Full Festival Calendar</h2>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredAndSortedFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedFestivals.map((festival, index) => (
                  <FestivalCard key={festival.id} festival={festival} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No festivals found for the selected filters.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Cultural Significance Section */}
        <AnimatedSection delay={0.4}>
          <div className="bg-orange-50 rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-semibold text-orange-800 text-center mb-6">
              🌿 Cultural Significance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tribal Festivals</h3>
                <p className="text-gray-700">
                  Jharkhand's tribal festivals like Sarhul, Karma, and Tusu Parab celebrate the deep connection 
                  between indigenous communities and nature. These festivals feature traditional dances, 
                  music, and rituals that have been preserved for generations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Religious Diversity</h3>
                <p className="text-gray-700">
                  The state celebrates major Hindu festivals like Diwali, Holi, and Chhath Puja with great 
                  enthusiasm. These festivals bring together people from all communities, showcasing 
                  Jharkhand's religious harmony and cultural diversity.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}