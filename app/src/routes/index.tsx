import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-[#121212] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <h1 className="text-6xl font-extrabold text-white mb-4">
            Welcome to MyTasks
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Manage your projects, track your finances, and stay organized
          </p>
        </div>
      </div>
    </div>
  )
}
