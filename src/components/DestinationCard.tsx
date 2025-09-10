'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Destination } from '@/types/database'
import { motion } from 'framer-motion'

interface DestinationCardProps {
  destination: Destination
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative h-48 w-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={imageError ? '/images/placeholder-destination.jpg' : destination.image_url}
          alt={destination.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"
          whileHover={{ bgOpacity: 0.2 }}
        />
      </motion.div>
      
      <div className="p-4">
        <motion.h3 
          className="text-xl font-semibold text-green-800 mb-2"
          whileHover={{ color: '#16a34a' }}
        >
          {destination.name}
        </motion.h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {destination.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>📍 {destination.location}</span>
          <span>🕐 {destination.best_time_to_visit}</span>
        </div>
        
        <motion.div 
          className="mt-3"
          whileHover={{ scale: 1.05 }}
        >
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {destination.category}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DestinationCard