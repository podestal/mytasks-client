import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Clock } from 'lucide-react'

export const Route = createFileRoute('/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="w-[90%] max-w-6xl ml-0 mr-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-700 via-red-700 to-pink-700 bg-clip-text text-transparent mb-2">
                Calendar
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <p className="text-lg font-medium">
                  Schedule and manage your time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <p className="text-gray-500 text-center py-12">
            Calendar view coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

