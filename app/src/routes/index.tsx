import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-4">
            Welcome to MyTasks
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your projects, track your finances, and stay organized
          </p>
        </div>
      </div>
    </div>
  )
}
