'use client'

interface StatsCardProps {
  title: string
  value: number | string
  change?: number
  icon: React.ReactNode
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-600 truncate"> {/* Changed to text-gray-600 */}
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900"> {/* Added text-gray-900 */}
                {value}
              </div>
              {change && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

interface AdminStatsProps {
  stats: {
    totalVisitors: number
    totalItineraries: number
    totalChats: number
    totalProducts: number
  }
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Visitors"
        value={stats.totalVisitors.toLocaleString()}
        change={12}
        icon="👥"
      />
      <StatsCard
        title="Itineraries Generated"
        value={stats.totalItineraries}
        change={8}
        icon="🗺️"
      />
      <StatsCard
        title="Chat Conversations"
        value={stats.totalChats}
        change={15}
        icon="💬"
      />
      <StatsCard
        title="Products Listed"
        value={stats.totalProducts}
        change={5}
        icon="🛍️"
      />
    </div>
  )
}