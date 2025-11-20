import { createFileRoute } from '@tanstack/react-router'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export const Route = createFileRoute('/money')({
  component: MoneyPage,
})

function MoneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="w-[90%] max-w-6xl ml-0 mr-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent mb-2">
                Financial Overview
              </h1>
              <p className="text-lg text-gray-600">
                Track your income, expenses, and financial goals
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <p className="text-gray-500 text-center py-12">
            Money management features coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

