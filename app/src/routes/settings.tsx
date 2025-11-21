import { createFileRoute } from '@tanstack/react-router'
import { Settings, Cog } from 'lucide-react'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-6xl ml-0 mr-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#1DB954] rounded-2xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                Settings
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Cog className="w-5 h-5" />
                <p className="text-lg font-medium">
                  Configure your preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 border border-gray-800">
          <p className="text-gray-400 text-center py-12">
            Settings panel coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

