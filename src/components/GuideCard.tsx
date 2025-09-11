import Image from 'next/image'
import { LocalGuide } from '@/types/database'
import BookingModal from './BookingModal'
import { useState } from 'react'

interface GuideCardProps {
  guide: LocalGuide
}

export default function GuideCard({ guide }: GuideCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      nature: 'bg-green-100 text-green-800',
      culture: 'bg-yellow-100 text-yellow-800',
      adventure: 'bg-red-100 text-red-800',
      wildlife: 'bg-orange-100 text-orange-800',
      photography: 'bg-blue-100 text-blue-800'
    }
    return colors[specialty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={guide.profile_image}
            alt={guide.name}
            fill
            className="object-cover"
          />
          {guide.verified && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
              ✅ Verified
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {guide.name}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ⭐ {guide.rating} ({guide.review_count})
            </span>
          </div>

          <div className="flex items-center mb-3">
            <span className={`px-2 py-1 rounded-full text-xs ${getSpecialtyColor(guide.specialty)}`}>
              {guide.specialty.charAt(0).toUpperCase() + guide.specialty.slice(1)}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {guide.experience_years} years exp
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {guide.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {guide.languages.map((lang) => (
              <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {lang}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-green-600">
              ₹{guide.hourly_rate}/hour
            </span>
            <span className="text-sm text-gray-500">
              📍 {guide.location}
            </span>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="guide"
        serviceId={guide.id}
        serviceName={guide.name}
        serviceImage={guide.profile_image}
      />
    </>
  )
}