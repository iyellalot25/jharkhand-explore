'use client'

interface ItineraryDisplayProps {
  itinerary: string
  loading?: boolean
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ 
  itinerary, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-green-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Generating your itinerary with AI...</p>
          <p className="text-sm text-gray-600 mt-2">Using Gemini AI 2.5 Flash</p>
        </div>
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold mb-2">Your AI-Powered Itinerary</h3>
        <p>Tell us your preferences to generate a personalized Jharkhand itinerary!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[70vh] overflow-y-auto"> {/* Added height and scroll */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-semibold text-green-800">Your Jharkhand Itinerary</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          ✅ AI Generated
        </span>
      </div>
      
      <div className="bg-green-50 border border-green-200 p-3 rounded-md mb-4">
        <p className="text-green-700 text-sm">
          🚀 Generated with Gemini 2.5 Flash AI
        </p>
      </div>
      
      <div className="prose max-w-none">
        <div 
          className="text-gray-700 whitespace-pre-wrap leading-relaxed"
          dangerouslySetInnerHTML={{ __html: itinerary.replace(/\n/g, '<br/>') }}
        />
      </div>
    </div>
  )
}

export default ItineraryDisplay