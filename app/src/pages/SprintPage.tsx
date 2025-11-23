import { useParams, Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock
} from 'lucide-react'
import axios from 'axios'
import type { Sprint } from '@/services/api/sprintService'
import TasksMain from '@/components/tasks/TasksMain'


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const SprintPage = () => {
  const { sprintId } = useParams({ from: '/sprints/$sprintId' })
  const location = useLocation()
  const [sprint, setSprint] = useState<Sprint | null>(
    (location.state as { sprint?: Sprint })?.sprint || null
  )
  const [isLoadingSprint, setIsLoadingSprint] = useState(!sprint)
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    // If sprint wasn't passed via state, fetch it from the server
    if (!sprint && sprintId) {
      setIsLoadingSprint(true)
      axios.get(`${url}sprints/${sprintId}`)
        .then((response) => {
          console.log(response)
          setSprint(response.data[0])
          setIsLoadingSprint(false)
        })
        .catch((error) => {
          console.error('Error fetching sprint:', error)
          setIsLoadingSprint(false)
        })
    }
  }, [sprintId, sprint])

  const daysUntilDeadline = sprint
    ? Math.ceil(
        (new Date(sprint.deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-7xl ml-0 mr-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Sprint Summary Header */}
        {isLoadingSprint ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] border-l-4 border-[#1DB954] rounded-2xl p-6 mb-8 shadow-lg"
          >
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
          </motion.div>
        ) : sprint ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] border-l-4 border-[#1DB954] rounded-2xl p-6 mb-8 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {sprint.name}
                </h1>
                {sprint.description && (
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    {sprint.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Due: {formatDate(sprint.deadline)}</span>
                {sprint.status === 'A' && (
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs ${
                      daysUntilDeadline < 7
                        ? 'bg-red-500/20 text-red-400'
                        : daysUntilDeadline < 14
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-[#1DB954]/20 text-[#1DB954]'
                    }`}
                  >
                    {daysUntilDeadline > 0
                      ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                      : 'Overdue'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-4 h-4" />
                {/* <span>{sprint.tasks.filter((t: Task) => t.status === 'done').length} of {sprint.tasks.length} tasks completed</span> */}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDate(sprint.updated_at)}</span>
              </div>
            </div>
          </motion.div>
        ) : null}

        {sprint && <TasksMain sprintId={sprint.id} />}
      </div>
    </div>
  )
}

export default SprintPage

