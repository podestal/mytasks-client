import { createFileRoute } from '@tanstack/react-router'
import { DollarSign } from 'lucide-react'

export const Route = createFileRoute('/money')({
  component: MoneyPage,
})

function MoneyPage() {
  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-6xl ml-0 mr-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#1DB954] rounded-2xl shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                Financial Overview
              </h1>
              <p className="text-lg text-gray-400">
                Track your income, expenses, and financial goals
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 border border-gray-800">
          <p className="text-gray-400 text-center py-12">
            Money management features coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

