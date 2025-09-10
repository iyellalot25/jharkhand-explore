'use client'

interface ActivityItem {
  id: string
  type: 'itinerary' | 'chat' | 'visit'
  description: string
  timestamp: string
  user?: string
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'itinerary': return '🗺️'
      case 'chat': return '💬'
      case 'visit': return '👁️'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3> {/* Added text-gray-900 */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm">{getIcon(activity.type)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate"> {/* Added text-gray-900 */}
                {activity.description}
              </p>
              <p className="text-sm text-gray-600"> {/* Changed from text-gray-500 to text-gray-600 for better visibility */}
                {activity.timestamp} {activity.user && `• ${activity.user}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}