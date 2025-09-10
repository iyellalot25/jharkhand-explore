import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import AdminStats from '@/components/AdminStats'
import RecentActivity from '@/components/RecentActivity'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  // Fetch stats from Supabase
  const [
    { count: itineraryCount },
    { count: chatCount },
    { data: products }
  ] = await Promise.all([
    supabase.from('itineraries').select('*', { count: 'exact' }),
    supabase.from('chat_messages').select('*', { count: 'exact' }),
    supabase.from('destinations').select('*')
  ])

  // Mock data for demo
  const stats = {
    totalVisitors: 1242,
    totalItineraries: itineraryCount || 0,
    totalChats: chatCount || 0,
    totalProducts: products?.length || 0
  }

  const recentActivities = [
    {
      id: '1',
      type: 'itinerary' as const,
      description: 'New 3-day nature itinerary generated',
      timestamp: '2 minutes ago',
      user: 'user@example.com'
    },
    {
      id: '2',
      type: 'chat' as const,
      description: 'Chat conversation about Netarhat weather',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      type: 'visit' as const,
      description: 'New user visited destinations page',
      timestamp: '30 minutes ago'
    },
    {
      id: '4',
      type: 'itinerary' as const,
      description: 'Cultural itinerary for 4 days created',
      timestamp: '1 hour ago',
      user: 'user2@example.com'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {session.user.email}</span>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminStats stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                View All Itineraries
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                Check Chat Logs
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
                Manage Products
              </button>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm">
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900">API: Operational</span> {/* Added text-gray-900 */}
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900">Database: Connected</span> {/* Added text-gray-900 */}
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900">AI Services: Online</span> {/* Added text-gray-900 */}
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}