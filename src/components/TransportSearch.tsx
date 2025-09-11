'use client'

import { useState } from 'react'
import { TransportStation, TransportSchedule } from '@/types/transport'
import { transportService } from '@/services/transportService'
import TransportScheduleCard from './TransportScheduleCard'

export default function TransportSearch() {
  const [fromStation, setFromStation] = useState('')
  const [toStation, setToStation] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [stations, setStations] = useState<TransportStation[]>([])
  const [schedules, setSchedules] = useState<TransportSchedule[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleStationSearch = async (query: string, type: 'from' | 'to') => {
    if (query.length < 2) return
    
    const results = await transportService.searchStations(query)
    setStations(results)
  }

const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // If user selected from station suggestions, use the code directly
  let finalFrom = fromStation
  let finalTo = toStation
  
  // Check if the input matches any station name and extract code
  if (fromStation.length > 2) {
    const matchedStation = stations.find(s => 
      s.name.toLowerCase().includes(fromStation.toLowerCase()) ||
      s.code.toLowerCase() === fromStation.toLowerCase()
    )
    if (matchedStation) {
      finalFrom = matchedStation.code
    }
  }
  
  if (toStation.length > 2) {
    const matchedStation = stations.find(s => 
      s.name.toLowerCase().includes(toStation.toLowerCase()) ||
      s.code.toLowerCase() === toStation.toLowerCase()
    )
    if (matchedStation) {
      finalTo = matchedStation.code
    }
  }
  
  if (!finalFrom || !finalTo || !travelDate) return

  setLoading(true)
  try {
    const results = await transportService.getSchedules(finalFrom, finalTo, travelDate)
    setSchedules(results)
    setSearchPerformed(true)
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    setLoading(false)
  }
}
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🚆 Search Trains & Buses
      </h2>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Station
            </label>
            <input
              type="text"
              value={fromStation}
              onChange={(e) => {
                setFromStation(e.target.value)
                handleStationSearch(e.target.value, 'from')
              }}
              placeholder="Enter station name or code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Station
            </label>
            <input
              type="text"
              value={toStation}
              onChange={(e) => {
                setToStation(e.target.value)
                handleStationSearch(e.target.value, 'to')
              }}
              placeholder="Enter station name or code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-md transition-colors font-semibold"
        >
          {loading ? 'Searching...' : 'Search Transport'}
        </button>
      </form>

      {stations.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matching Stations:</h3>
          <div className="space-y-1">
            {stations.map(station => (
              <div
                key={station.id}
                className="flex justify-between items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => {
                  if (fromStation === '') setFromStation(station.code)
                  else setToStation(station.code)
                  setStations([])
                }}
              >
                <span className="text-sm font-medium">{station.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{station.code} • {station.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchPerformed && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Results for {fromStation} to {toStation} on {formatDate(travelDate)}
          </h3>

          {schedules.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">No transport found for this route.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedules.map(schedule => (
                <TransportScheduleCard key={schedule.id} schedule={schedule} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}