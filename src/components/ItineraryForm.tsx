'use client'

import { useState } from 'react'

interface ItineraryFormProps {
  onSubmit: (data: any) => void
  loading: boolean
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    days: 3,
    interests: [] as string[],
    budget: 'medium',
    pace: 'moderate'
  })

  const interestOptions = [
    'Nature & Wildlife',
    'Tribal Culture',
    'Adventure Sports',
    'Religious Sites',
    'Local Cuisine',
    'Photography',
    'History & Heritage'
  ]

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.interests.length === 0) {
      alert('Please select at least one interest')
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">
        Plan Your Jharkhand Adventure
      </h2>

      {/* Number of Days */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Days 🪻
        </label>
        <select
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
        >
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <option key={day} value={day} className="text-gray-900">
              {day} day{day > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Interests */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Interests 🌟
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`p-3 rounded-md border transition-colors text-sm ${
                formData.interests.includes(interest)
                  ? 'bg-green-100 border-green-500 text-green-800 font-medium'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget 💰
        </label>
        <div className="flex space-x-4">
          {['low', 'medium', 'high'].map(option => (
            <label key={option} className="flex items-center text-gray-900">
              <input
                type="radio"
                name="budget"
                value={option}
                checked={formData.budget === option}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="mr-2 text-green-600 focus:ring-green-500"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pace */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Pace 🚶‍♂️
        </label>
        <div className="flex space-x-4">
          {['relaxed', 'moderate', 'fast'].map(option => (
            <label key={option} className="flex items-center text-gray-900">
              <input
                type="radio"
                name="pace"
                value={option}
                checked={formData.pace === option}
                onChange={(e) => setFormData({ ...formData, pace: e.target.value as any })}
                className="mr-2 text-green-600 focus:ring-green-500"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors"
      >
        {loading ? 'Generating Your Itinerary...' : 'Generate Itinerary'}
      </button>
    </form>
  )
}

export default ItineraryForm