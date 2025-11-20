import { createFileRoute } from '@tanstack/react-router'
import { Settings, Cog } from 'lucide-react'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="w-[90%] max-w-6xl ml-0 mr-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-700 via-slate-700 to-zinc-700 bg-clip-text text-transparent mb-2">
                Settings
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Cog className="w-5 h-5" />
                <p className="text-lg font-medium">
                  Configure your preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <p className="text-gray-500 text-center py-12">
            Settings panel coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

