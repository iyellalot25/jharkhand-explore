'use client'

import React, { useState } from 'react' 
import Image from 'next/image'
import { Festival } from '@/types/database'
import { motion } from 'framer-motion'

interface FestivalCardProps {
  festival: Festival
}

const FestivalCard: React.FC<FestivalCardProps> = ({ festival }) => {
  const [imageError, setImageError] = useState(false)
  
  const getCategoryColor = (category: string) => {
    const colors = {
      tribal: 'bg-orange-100 text-orange-800',
      religious: 'bg-blue-100 text-blue-800',
      cultural: 'bg-purple-100 text-purple-800',
      harvest: 'bg-green-100 text-green-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const isUpcoming = new Date(festival.start_date) >= new Date()

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder-festival.jpg' : festival.image_url || '/images/placeholder-festival.jpg'}
          alt={festival.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isUpcoming && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Upcoming
          </div>
        )}
        {festival.is_public_holiday && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Public Holiday
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{festival.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(festival.category)}`}>
            {festival.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {festival.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-3">📅 {formatDate(festival.start_date)}</span>
          {festival.start_date !== festival.end_date && (
            <span>to {formatDate(festival.end_date)}</span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>📍 {festival.location}</span>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Significance:</strong> {festival.significance}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default FestivalCard