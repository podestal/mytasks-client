import { useParams, Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { Sprint } from '@/services/api/sprintService'
import TasksMain from '@/components/tasks/TasksMain'
import SprintHeader from '@/components/sprints/SprintHeader'
import useGetSprintById from '@/hooks/api/sprints/useGetSprintById'

const SprintPage = () => {
  const { sprintId } = useParams({ from: '/sprints/$sprintId' })
  const location = useLocation()
  const sprintFromState = (location.state as { sprint?: Sprint })?.sprint || null
  
  // Always fetch sprint data (React Query will use cache if available)
  // Only skip if we have it from state AND it's valid
  const { data: sprintFromQuery, isLoading, isError, error } = useGetSprintById({
    access: '',
    sprintId: parseInt(sprintId || '0'),
    enabled: !!sprintId, // Always fetch if we have a sprintId (React Query handles caching)
  })

  // Prefer state sprint (from navigation), fallback to query result
  const sprint = sprintFromState || sprintFromQuery || null

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
        {isLoading ? (
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
        ) : isError ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-red-500/10 border-l-4 border-red-500 rounded-2xl p-6 mb-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Sprint</h2>
            <p className="text-red-300 text-sm">{error?.message || 'Failed to load sprint data'}</p>
          </motion.div>
        ) : sprint ? (
          <SprintHeader sprint={sprint} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] border-l-4 border-gray-500 rounded-2xl p-6 mb-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-400">Sprint not found</h2>
            <p className="text-gray-500 text-sm">Unable to load sprint data.</p>
          </motion.div>
        )}

        {sprint && <TasksMain sprintId={sprint.id} />}
      </div>
    </div>
  )
}

export default SprintPage

